import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFocusEffect } from '@react-navigation/native'
import { authenticateUser } from '../../utils/biometrics'
import { processTransaction } from '../../services/api'
import { transactionSuccess } from '../../redux/slices/transactionSlice'
import { setContacts } from '../../redux/slices/contactSlice'
import { MaterialIcons } from '@expo/vector-icons'
import { getContacts } from '../../utils/contacts'
import ContactSelector from '../../components/ContactSelector'
import { RootState } from '../../redux/store'
import { showPinModal } from '../../redux/slices/pinSlice'
import PinModal from '../../components/PinModal'
import { deductBalance } from '../../redux/slices/balanceSlice'
import { addTransactionToHistory } from '../../redux/slices/transactionHistorySlice'
import { commonStyles } from '../../styles/commonStyles'
import LoadingOverlay from '../../components/LoadingOverlay'

const PaymentScreen: React.FC = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [pinModalVisible, setPinModalVisible] = useState(false)
  const [pendingTransaction, setPendingTransaction] = useState<any | null>(null)
  const contacts = useSelector((state: RootState) => state.contacts.list)
  const pin = useSelector((state: RootState) => state.pin.pin)
  const balance = useSelector((state: RootState) => state.balance.balance)
  const recentTransactions = useSelector(
    (state: RootState) => state.transactionHistory.history,
  )
  const getPaymentSchema = (balance: number) =>
    Yup.object().shape({
      recipient: Yup.string().required('Recipient is required'),
      amount: Yup.number()
        .typeError('Amount must be a number')
        .positive('Amount must be greater than 0')
        .max(balance, 'Insufficient balance')
        .required('Amount is required'),
      note: Yup.string().optional(),
    })
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getPaymentSchema(balance)),
    defaultValues: { recipient: '', amount: '', note: '' },
  })

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (loading) {
          return true // prevent user navigate back when payment is initiating
        }
        return false
      }
      BackHandler.addEventListener('hardwareBackPress', onBackPress)
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, [loading]),
  )

  const handleTransaction = async (data: any) => {
    try {
      setLoading(true)
      const response = await processTransaction(
        data.recipient,
        Number(data.amount),
      )

      if (response.success) {
        const transactionData = {
          transactionId: response.transactionId!,
          recipient: data.recipient,
          amount: data.amount,
        }

        dispatch(transactionSuccess(transactionData))
        dispatch(addTransactionToHistory(transactionData))
        dispatch(deductBalance(Number(data.amount)))

        router.replace('/paymentFlow/confirmation')
      } else {
        Alert.alert(
          'Transaction Failed',
          response.message || 'Unknown error occurred',
        )
      }
    } catch (error) {
      console.error('Unexpected error:', error)
      Alert.alert('Error', 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
      setPendingTransaction(null)
    }
  }

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      await authenticateUser(
        async () => {
          console.log(
            'Biometric authentication successful. Proceeding with transaction.',
          )
          await handleTransaction(data)
        },
        (reason) => {
          setLoading(false)

          if (!pin) {
            console.log('No PIN set. Showing PIN modal.')
            setPendingTransaction(data)
            dispatch(showPinModal())
          } else {
            console.log('Prompting user for PIN.')
            setPendingTransaction(data)
            dispatch(showPinModal())
          }
        },
      )
    } catch (error) {
      console.error('Unexpected error:', error)
      Alert.alert('Error', 'Something went wrong. Please try again.')
    }
  }

  const fetchContacts = async () => {
    try {
      const contactList = await getContacts()
      dispatch(setContacts(contactList))
      setModalVisible(true)
    } catch (error) {
      Alert.alert('Error', 'Please grant access to contacts.' + error)
    }
  }

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.heading1}>Balance: ${balance}</Text>

      <View style={commonStyles.labelContainer}>
        <Text style={commonStyles.heading2}>Recipient</Text>
        <TouchableOpacity
          onPress={fetchContacts}
          style={commonStyles.iconContainer}
        >
          <MaterialIcons name="contacts" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Controller
        control={control}
        name="recipient"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={commonStyles.input}
            placeholder="Enter recipient"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.recipient && (
        <Text style={commonStyles.error}>{errors.recipient.message}</Text>
      )}

      <ContactSelector
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={(name) => setValue('recipient', name)}
      />

      <View style={{ height: 20 }} />
      <Text style={commonStyles.heading2}>Amount</Text>
      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={commonStyles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9.]/g, '')
              onChange(numericValue === '' ? '' : Number(numericValue))
            }}
            value={value ? String(value) : ''}
          />
        )}
      />
      {errors.amount && (
        <Text style={commonStyles.error}>{errors.amount.message}</Text>
      )}
      <View style={{ height: 20 }} />

      <TouchableOpacity
        style={commonStyles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        <Text style={commonStyles.buttonText}>Send Payment</Text>
      </TouchableOpacity>
      <View style={{ height: 20 }} />

      {recentTransactions.length > 0 && (
        <>
          <Text style={commonStyles.heading1}>Recent Transactions</Text>
          <FlatList
            data={recentTransactions}
            keyExtractor={(item) => item.transactionId}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.transactionItem}
                onPress={() => {
                  setValue('recipient', item.recipient)
                  setValue('amount', item.amount)
                }}
              >
                <Text style={commonStyles.subheading1}>{item.recipient}</Text>
                <Text style={commonStyles.subheading1}>${item.amount}</Text>
              </TouchableOpacity>
            )}
            style={styles.recentTransactionsContainer}
          />
        </>
      )}
      <PinModal
        onPinSuccess={() =>
          pendingTransaction && handleTransaction(pendingTransaction)
        }
      />
      <LoadingOverlay visible={loading} message="Processing..." />
    </View>
  )
}

const styles = StyleSheet.create({
  recentTransactionsContainer: {
    flex: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
})

export default PaymentScreen

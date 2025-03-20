import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { authenticateUser } from '../utils/biometrics'
import { processTransaction } from '../services/api'

const accountBalance = 500

const paymentSchema = Yup.object().shape({
  recipient: Yup.string().required('Recipient is required'),
  amount: Yup.number()
    .typeError('Amount must be a number')
    .positive('Amount must be greater than 0')
    .max(accountBalance, 'Insufficient balance')
    .required('Amount is required'),
  note: Yup.string().optional(),
})

const PaymentScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(paymentSchema),
    defaultValues: { recipient: '', amount: '', note: '' },
  })

  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: any) => {
    setLoading(true)

    authenticateUser(async () => {
      const response = await processTransaction(
        data.recipient,
        Number(data.amount),
      )

      if (response.success) {
        navigation.navigate('confirmation', {
          recipient: data.recipient,
          amount: data.amount,
          transactionId: response.transactionId,
        })
      } else {
        Alert.alert(
          'Transaction Failed',
          response.message || 'Unknown error occurred',
        )
      }

      setLoading(false)
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.balance}>Balance: ${accountBalance}</Text>

      <Text>Recipient</Text>
      <Controller
        control={control}
        name="recipient"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter recipient"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.recipient && (
        <Text style={styles.error}>{errors.recipient.message}</Text>
      )}

      <Text>Amount</Text>
      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
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
        <Text style={styles.error}>{errors.amount.message}</Text>
      )}

      <Button
        title="Send Payment"
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      />
      {loading && <ActivityIndicator size="large" color="blue" />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  balance: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  error: { color: 'red', fontSize: 12, marginBottom: 10 },
})

export default PaymentScreen

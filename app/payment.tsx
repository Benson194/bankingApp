import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { authenticateUser } from '../utils/biometrics';


const accountBalance = 500 // Simulated account balance

// Validation schema
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

  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const onSubmit = (data: any) => {
        authenticateUser(() => {
          Alert.alert("Payment Successful", `Sent $${data.amount} to ${data.recipient}`);
        }, setIsAuthenticating);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.balance}>Balance: ${accountBalance}</Text>

      <Text>Recipient</Text>
      <Controller
        control={control}
        name="recipient"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter recipient" onChangeText={onChange} value={value}
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
              const numericValue = text.replace(/[^0-9.]/g, '') // Remove non-numeric characters
              onChange(numericValue === '' ? '' : Number(numericValue)) // Convert to number
            }}
            value={value ? String(value) : ''}
          />
        )}
      />
      {errors.amount && (
        <Text style={styles.error}>{errors.amount.message}</Text>
      )}

      <Text>Note (Optional)</Text>
      <Controller
        control={control}
        name="note"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter note"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Button
        title="Send Payment"
        onPress={handleSubmit(onSubmit)}
        disabled={isAuthenticating}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  balance: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
})

export default PaymentScreen

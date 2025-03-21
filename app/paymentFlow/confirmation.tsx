import React, { useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const ConfirmationScreen: React.FC = () => {
  const navigation = useNavigation()
  const transaction = useSelector((state: RootState) => state.transaction)

  useEffect(() => {
    console.log('Transaction state updated:', transaction)
  }, [transaction])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Successful</Text>
      {transaction.transactionId ? (
        <>
          <Text>Recipient: {transaction.recipient}</Text>
          <Text>Amount: ${transaction.amount}</Text>
          <Text>Transaction ID: {transaction.transactionId}</Text>
        </>
      ) : (
        <Text>Loading transaction details...</Text>
      )}

      <Button
        title="Back to Home"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'index' }],
          })
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
})

export default ConfirmationScreen

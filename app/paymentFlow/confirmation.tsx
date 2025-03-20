import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const ConfirmationScreen: React.FC = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { transactionId, recipient, amount } = useSelector(
    (state: RootState) => state.transaction,
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Successful</Text>
      <Text>Recipient: {recipient}</Text>
      <Text>Amount: ${amount}</Text>
      <Text>Transaction ID: {transactionId}</Text>
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

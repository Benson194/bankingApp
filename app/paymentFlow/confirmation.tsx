import React, { useCallback } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { commonStyles } from '../../styles/commonStyles'

const ConfirmationScreen: React.FC = () => {
  const navigation = useNavigation()
  const transaction = useSelector((state: RootState) => state.transaction)

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true
      BackHandler.addEventListener('hardwareBackPress', onBackPress)
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, []),
  )

  return (
    <View style={styles.container}>
      <Text style={commonStyles.heading1}>Payment Successful</Text>
      {transaction.transactionId ? (
        <>
          <Text style={commonStyles.subheading1}>
            Recipient: {transaction.recipient}
          </Text>
          <Text style={commonStyles.subheading1}>
            Amount: ${transaction.amount}
          </Text>
          <Text style={commonStyles.subheading1}>
            Transaction ID: {transaction.transactionId}
          </Text>
        </>
      ) : (
        <Text>Loading transaction details...</Text>
      )}
      <View style={{ height: 20 }} />
      <TouchableOpacity
        style={commonStyles.button}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'index' }],
          })
        }
      >
        <Text style={commonStyles.buttonText}>Back to home</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',
  },
})

export default ConfirmationScreen

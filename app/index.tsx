import { View, Text, Button, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { commonStyles } from '../styles/commonStyles'

export default function HomeScreen() {
  const router = useRouter()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Welcome to RytBank
      </Text>
      <View style={{ height: 20 }} />
      <TouchableOpacity
        style={commonStyles.button}
        onPress={() => router.push('/paymentFlow/payment')}
      >
        <Text style={commonStyles.buttonText}>Make a Payment</Text>
      </TouchableOpacity>
    </View>
  )
}

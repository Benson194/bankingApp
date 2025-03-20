import { View, Text, Button } from 'react-native'
import { useRouter } from 'expo-router'

export default function HomeScreen() {
  const router = useRouter()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Welcome to RytBank
      </Text>
      <Button
        title="Make a Payment"
        onPress={() => router.push('/paymentFlow/payment')}
      />
    </View>
  )
}

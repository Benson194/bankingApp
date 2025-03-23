// app/(paymentFlow)/_layout.tsx
import { Stack } from 'expo-router'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'

export default function PaymentFlowLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="payment" options={{ title: 'Payment' }} />
        <Stack.Screen name="confirmation" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  )
}

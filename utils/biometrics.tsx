import * as LocalAuthentication from 'expo-local-authentication'
import { Alert } from 'react-native'

export const authenticateUser = async (onSuccess: () => void) => {
  try {
    const hasBiometricHardware = await LocalAuthentication.hasHardwareAsync()
    const isBiometricSupported = await LocalAuthentication.isEnrolledAsync()

    if (!hasBiometricHardware || !isBiometricSupported) {
      Alert.alert(
        'Biometric Not Available',
        'Please enable biometrics in settings.',
      )
      throw new Error('Biometric authentication not available')
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate Payment',
      fallbackLabel: 'Enter Passcode',
    })

    if (result.success) {
      onSuccess()
    } else {
      throw new Error('Biometric authentication failed')
    }
  } catch (error) {
    throw new Error('Authentication Error')
  }
}

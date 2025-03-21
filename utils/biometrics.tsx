import * as LocalAuthentication from 'expo-local-authentication'
import { Alert } from 'react-native'

export const authenticateUser = async (
  onSuccess: () => void,
  onFailure: (reason: 'UNAVAILABLE' | 'FAILED') => void,
) => {
  try {
    const hasBiometricHardware = await LocalAuthentication.hasHardwareAsync()
    const isBiometricSupported = await LocalAuthentication.isEnrolledAsync()

    if (!hasBiometricHardware || !isBiometricSupported) {
      console.log('Biometric authentication not available.')
      onFailure('UNAVAILABLE')
      return
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate Payment',
      fallbackLabel: 'Enter Passcode',
    })

    if (result.success) {
      onSuccess()
    } else {
      console.log('Biometric authentication failed.')
      onFailure('FAILED')
    }
  } catch (error) {
    console.error('Biometric authentication error:', error)
    onFailure('FAILED')
  }
}

import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";

export const authenticateUser = async (onSuccess: () => void, setIsAuthenticating: (value: boolean) => void) => {
  setIsAuthenticating(true);

  try {
    // Check if biometric authentication is available
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert("Error", "Your device does not support biometric authentication.");
      setIsAuthenticating(false);
      return;
    }

    // Check if any biometrics (Face ID, Touch ID, Fingerprint) are set up
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert("Biometric Not Set Up", "Please enable Face ID / Fingerprint in your settings.");
      setIsAuthenticating(false);
      return;
    }

    // Request biometric authentication
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate Payment",
      fallbackLabel: "Use Passcode",
      cancelLabel: "Cancel",
    });

    if (result.success) {
      onSuccess();
    } else {
      Alert.alert("Authentication Failed", "You need to authenticate to proceed.");
    }
  } catch (error) {
    console.log("Authentication Error:", error);
    Alert.alert("Error", "An unexpected error occurred.");
  } finally {
    setIsAuthenticating(false);
  }
};

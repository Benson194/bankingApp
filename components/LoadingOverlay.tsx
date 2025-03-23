import React from 'react'
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'
import { commonStyles } from '../styles/commonStyles'

interface LoadingOverlayProps {
  visible: boolean
  message?: string
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message,
}) => {
  if (!visible) return null // Don't render if not visible

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#007AFF" />
      {message && <Text style={commonStyles.heading1}>{message}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default LoadingOverlay

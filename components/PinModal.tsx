import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setUserPin, hidePinModal } from '../redux/slices/pinSlice'
import { commonStyles } from '../styles/commonStyles'

const PinModal: React.FC<{ onPinSuccess: () => void }> = ({ onPinSuccess }) => {
  const dispatch = useDispatch()
  const isVisible = useSelector((state: RootState) => state.pin.isModalVisible)
  const pinFromStore = useSelector((state: RootState) => state.pin.pin)
  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isVisible) {
      setPin('')
      setConfirmPin('')
      setError('')
    }
  }, [isVisible])

  const handleSavePin = () => {
    setError('')

    if (pin.length < 6 || pin.length > 6) {
      setError('PIN must be exactly 6 digits.')
      return
    }

    if (!pinFromStore) {
      if (pin !== confirmPin) {
        setError('Both PIN entries must match.')
        return
      }
      dispatch(setUserPin(pin))
    } else {
      if (pin !== pinFromStore) {
        setError('Incorrect PIN. Please try again.')
        return
      }
    }

    dispatch(hidePinModal())
    onPinSuccess()
  }

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={commonStyles.heading1}>
            {pinFromStore ? 'Enter Your PIN' : 'Set Up Your PIN'}
          </Text>

          <TextInput
            style={commonStyles.input}
            placeholder="Enter 6-digit PIN"
            keyboardType="numeric"
            secureTextEntry
            maxLength={6}
            value={pin}
            onChangeText={(text) => setPin(text.replace(/[^0-9]/g, ''))}
          />

          {!pinFromStore && (
            <TextInput
              style={commonStyles.input}
              placeholder="Confirm 6-digit PIN"
              keyboardType="numeric"
              secureTextEntry
              maxLength={6}
              value={confirmPin}
              onChangeText={(text) =>
                setConfirmPin(text.replace(/[^0-9]/g, ''))
              }
            />
          )}

          {error ? <Text style={commonStyles.error}>{error}</Text> : null}
          <View style={{ height: 20 }} />
          <TouchableOpacity style={commonStyles.button} onPress={handleSavePin}>
            <Text style={commonStyles.buttonText}>
              {pinFromStore ? 'Submit' : 'Save PIN'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
})

export default PinModal

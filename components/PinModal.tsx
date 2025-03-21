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
          <Text style={styles.modalTitle}>
            {pinFromStore ? 'Enter Your PIN' : 'Set Up Your PIN'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter 6-digit PIN"
            keyboardType="numeric"
            secureTextEntry
            maxLength={6}
            value={pin}
            onChangeText={setPin}
          />

          {!pinFromStore && (
            <TextInput
              style={styles.input}
              placeholder="Confirm 6-digit PIN"
              keyboardType="numeric"
              secureTextEntry
              maxLength={6}
              value={confirmPin}
              onChangeText={setConfirmPin}
            />
          )}

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.submitButton} onPress={handleSavePin}>
            <Text style={styles.submitText}>
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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 14,
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default PinModal

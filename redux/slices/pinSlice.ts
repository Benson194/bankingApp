import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PinState {
  pin: string | null
  isModalVisible: boolean
}

const initialState: PinState = {
  pin: null,
  isModalVisible: false,
}

const pinSlice = createSlice({
  name: 'pin',
  initialState,
  reducers: {
    setUserPin: (state, action: PayloadAction<string>) => {
      console.log('Setting PIN:', action.payload)
      state.pin = action.payload
    },
    showPinModal: (state) => {
      console.log('Show pin modal:', state)

      state.isModalVisible = true
    },
    hidePinModal: (state) => {
      console.log('Hide pin modal:', state)
      state.isModalVisible = false
    },
  },
})

export const { setUserPin, showPinModal, hidePinModal } = pinSlice.actions
export default pinSlice.reducer

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
      state.pin = action.payload
    },
    showPinModal: (state) => {
      state.isModalVisible = true
    },
    hidePinModal: (state) => {
      state.isModalVisible = false
    },
  },
})

export const { setUserPin, showPinModal, hidePinModal } = pinSlice.actions
export default pinSlice.reducer

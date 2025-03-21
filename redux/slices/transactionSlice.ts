import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TransactionState {
  transactionId: string | null
  recipient: string | null
  amount: number | null
}

const initialState: TransactionState = {
  transactionId: null,
  recipient: null,
  amount: null,
}

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    transactionSuccess: (
      state,
      action: PayloadAction<{
        transactionId: string
        recipient: string
        amount: number
      }>,
    ) => {
      state.transactionId = action.payload.transactionId
      state.recipient = action.payload.recipient
      state.amount = action.payload.amount
    },
  },
})

export const { transactionSuccess } = transactionSlice.actions
export default transactionSlice.reducer

// redux/slices/transactionSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TransactionState {
  lastTransactionId?: string
  recipient?: string
  amount?: number
}

const initialState: TransactionState = {}

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
    resetTransaction: (state) => {
      state.transactionId = undefined
      state.recipient = undefined
      state.amount = undefined
    },
  },
})

export const { transactionSuccess, resetTransaction } = transactionSlice.actions
export default transactionSlice.reducer

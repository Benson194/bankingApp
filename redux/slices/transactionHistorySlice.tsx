import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Transaction } from './transactionSlice'

interface TransactionHistoryState {
  history: Transaction[]
}

const initialState: TransactionHistoryState = {
  history: [],
}

const transactionHistorySlice = createSlice({
  name: 'transactionHistory',
  initialState,
  reducers: {
    addTransactionToHistory: (state, action: PayloadAction<Transaction>) => {
      state.history.unshift(action.payload) // Add new transaction at the start
    },
  },
})

export const { addTransactionToHistory } = transactionHistorySlice.actions
export default transactionHistorySlice.reducer

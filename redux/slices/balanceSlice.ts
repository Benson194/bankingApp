import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BalanceState {
  balance: number
}

const initialState: BalanceState = {
  balance: 1000, // Starting balance
}

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    deductBalance: (state, action: PayloadAction<number>) => {
      state.balance = Math.max(0, state.balance - action.payload)
    },
  },
})

export const { deductBalance } = balanceSlice.actions
export default balanceSlice.reducer

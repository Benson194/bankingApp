import { configureStore } from '@reduxjs/toolkit'
import transactionReducer from './slices/transactionSlice'
import contactsReducer from './slices/contactSlice'
import pinReducer from './slices/pinSlice'
import balanceReducer from './slices/balanceSlice'

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    contacts: contactsReducer,
    pin: pinReducer,
    balance: balanceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

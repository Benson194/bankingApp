import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Contact {
  name: string
  phoneNumbers?: { number: string }[]
}

interface ContactsState {
  list: Contact[]
}

const initialState: ContactsState = {
  list: [],
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<Contact[]>) => {
      state.list = action.payload
    },
  },
})

export const { setContacts } = contactsSlice.actions
export default contactsSlice.reducer

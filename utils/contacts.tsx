import * as Contacts from 'expo-contacts'

export const getContacts = async () => {
  const { status } = await Contacts.requestPermissionsAsync()

  if (status !== 'granted') {
    throw new Error('Please grant access to contacts.')
  }

  const { data } = await Contacts.getContactsAsync({
    fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
  })

  if (data.length === 0) {
    throw new Error('No contacts found.')
  }

  return data.map((contact) => ({
    name: contact.name,
    phone: contact.phoneNumbers?.[0]?.number || 'No phone number',
  }))
}

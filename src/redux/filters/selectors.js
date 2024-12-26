export const selectQueryFilter = (state) => {
  const filteredContacts = state.contacts.items.filter(contact =>
    contact.name.toLowerCase().includes(state.filters.query.toLowerCase())
  );

  return filteredContacts; 
};
import { createSelector } from 'reselect';

// Базові селектори
const selectContacts = (state) => state.contacts.items;
const selectQuery = (state) => state.filters.query;

// Мемоізований селектор
export const selectQueryFilter = createSelector(
  [selectContacts, selectQuery],
  (contacts, query) => {
    if (!query) return contacts;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(query.toLowerCase())
    );
  }
);
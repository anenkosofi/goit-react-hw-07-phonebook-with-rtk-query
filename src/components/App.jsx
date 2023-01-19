import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import { GlobalStyle } from './GlobalStyle';
import { PhonebookBox, ContactBox } from './App.styled';
import { Box } from './Box.styled';

export function App() {
  return (
    <Box>
      <GlobalStyle />
      <PhonebookBox>
        <h1>Phonebook</h1>
        <ContactForm />
      </PhonebookBox>
      <ContactBox>
        <h2>Contacts</h2>
        <Filter />
        <ContactList />
      </ContactBox>
    </Box>
  );
}

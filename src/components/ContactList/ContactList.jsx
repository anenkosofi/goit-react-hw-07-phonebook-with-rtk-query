import { useGetContactsQuery } from 'redux/contactsSlice';
import { useSelector } from 'react-redux';
import { ContactListItem } from '../ContactListItem';
import { Loader } from 'components/Loader';
import { Contacts } from './ContactList.styled';
import { Notification } from 'components/Notification';

export function ContactList() {
  const { data, isLoading, isSuccess, error } = useGetContactsQuery();
  const filter = useSelector(state => state.filter);

  const getFilteredContacts = () => {
    if (!filter) {
      return data;
    }
    return data.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const contacts = getFilteredContacts();
  return (
    <Contacts>
      {isSuccess &&
        contacts.map(contact => (
          <ContactListItem key={contact.id} contact={contact} />
        ))}
      {contacts && contacts.length === 0 && <Notification />}
      {isLoading && !error && <Loader size={80} />}
    </Contacts>
  );
}

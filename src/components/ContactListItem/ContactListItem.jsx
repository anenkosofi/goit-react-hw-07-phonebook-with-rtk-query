import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useDeleteContactMutation } from 'redux/contactsSlice';
import { HiOutlinePhone, HiOutlineUserCircle } from 'react-icons/hi';
import { Loader } from 'components/Loader';
import { Contact, ContactWrapper, Button } from './ContactListItem.styled';

export function ContactListItem({ contact: { id, name, number } }) {
  const [deleteContact, { isLoading, isSuccess }] = useDeleteContactMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Contact was deleted!', {
        style: {
          border: '1px solid #1d976c',
          boxShadow: 'none',
          fontSize: '16px',
        },
        iconTheme: {
          primary: '#1d976c',
          secondary: '#fefefe',
        },
      });
    }
  }, [isSuccess]);

  return (
    <Contact>
      <Toaster position="top-right" reverseOrder={false} />
      <ContactWrapper>
        <p>
          <HiOutlineUserCircle size={20} />
          <span>{name}</span>
        </p>
        <p>
          <HiOutlinePhone size={20} />
          <span>{number}</span>
        </p>
      </ContactWrapper>
      <Button
        type="button"
        disabled={isLoading}
        onClick={() => deleteContact(id)}
      >
        {isLoading ? <Loader size={40} /> : 'Delete'}
      </Button>
    </Contact>
  );
}

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};

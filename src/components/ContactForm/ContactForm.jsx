import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import {
  useGetContactsQuery,
  useAddContactMutation,
} from 'redux/contactsSlice';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Loader } from 'components/Loader';
import {
  FormForAddingContacts,
  FormControl,
  Label,
  Input,
  Error,
  Button,
} from './ContactForm.styled';

export function ContactForm() {
  const { data: contacts } = useGetContactsQuery();
  const [addContact, { isLoading, isSuccess }] = useAddContactMutation();
  const initialValues = {
    name: '',
    number: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    const newContact = {
      ...values,
    };

    if (
      contacts.find(
        ({ name }) =>
          name.toLowerCase() === newContact.name.trim().toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in your contacts.`);
      resetForm();
      return;
    }

    addContact(newContact);

    resetForm();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Contact was added!', {
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

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        'Name may contain only letters, apostrophe, dash and spaces.'
      )
      .required('This field is required'),
    number: Yup.string()
      .matches(
        /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
        'Phone number must be digits'
      )
      .required('This field is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <FormForAddingContacts autoComplete="off">
        <Toaster position="top-right" reverseOrder={false} />
        <FormControl>
          <Input
            id="name"
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            placeholder=" "
          />
          <Label htmlFor="name">Name</Label>
          <Error component="div" name="name" />
        </FormControl>
        <FormControl>
          <Input
            id="number"
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            placeholder=" "
          />
          <Label htmlFor="number">Number</Label>
          <Error component="div" name="number" />
        </FormControl>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader size={40} /> : 'Add contact'}
        </Button>
      </FormForAddingContacts>
    </Formik>
  );
}

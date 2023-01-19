import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { Field, Label, Input } from './Filter.styled';

export function Filter() {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const changeHandler = e => {
    const { value } = e.currentTarget;
    dispatch(setFilter(value));
  };

  return (
    <Field>
      <Input
        type="text"
        value={filter}
        onChange={changeHandler}
        placeholder=" "
      />
      <Label>Find contacts by name</Label>
    </Field>
  );
}

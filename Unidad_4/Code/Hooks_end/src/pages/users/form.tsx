import SwitchInput from '@components/Form/Check';
import Input from '@components/Form/Input';
import NumberInput from '@components/Form/Number';
import React from 'react';
import { useParams } from 'react-router-dom';

type UserFormState = {
  name: string;
  age: number;
  city: string;
  valid: boolean;
};

type Action = {
  key: keyof UserFormState;
  value: string | boolean | number;
};

type Params = {
  index: string;
};

const UserForm = () => {
  const { index } = useParams<Params>();

  const [mode] = React.useState(index ? 'edit' : 'create');

  const [state, dispatch] = React.useReducer(handleChange, {
    name: '',
    age: 25,
    city: '',
    valid: false,
  });

  return (
    <div className="flex flex-col gap-4 w-[20rem]">
      <h1 className="text-4xl font-bold">User Form</h1>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          console.log('from', state);
        }}
      >
        <Input
          label="Name"
          value={state.name}
          onChange={(value) => dispatch({ key: 'name', value })}
        />

        <NumberInput
          label="Age"
          value={state.age}
          onChange={(value) => dispatch({ key: 'age', value })}
        />

        <Input
          label="City"
          value={state.city}
          onChange={(value) => dispatch({ key: 'city', value })}
        />

        <SwitchInput
          label="Verified"
          value={state.valid}
          onChange={(value) => dispatch({ key: 'valid', value })}
        />

        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
          type="submit"
        >
          {mode === 'edit' ? 'Edit' : 'Create'} user
        </button>
      </form>
    </div>
  );

  function handleChange(state: UserFormState, action: Action): UserFormState {
    return {
      ...state,
      [action.key]: action.value,
    };
  }
};

export default UserForm;

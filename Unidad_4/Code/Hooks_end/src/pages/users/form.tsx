import React from 'react';
import DataRepo from '@api/datasource';
import SwitchInput from '@components/Form/Check';
import Input from '@components/Form/Input';
import NumberInput from '@components/Form/Number';
import { useNavigate, useParams } from 'react-router-dom';
import { UserCreate } from '@customTypes/user';

type Action = {
  key: keyof UserCreate;
  value: string | boolean | number;
};

type Params = {
  index: string;
};

const UserForm = () => {
  const { index } = useParams<Params>();

  const navigate = useNavigate();

  const [mode] = React.useState(index ? 'edit' : 'create');

  const [loading, setLoading] = React.useState(false);

  const [state, dispatch] = React.useReducer(handleChange, {
    name: '',
    age: 25,
    city: '',
    verified: false,
  });

  return (
    <div className="flex flex-col gap-4 w-[40rem]">
      <div className="flex items-center gap-4">
        <div
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold">User form</h1>
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          DataRepo.saveUser(state)
            .catch(() => {
              alert('Error saving user');
            })
            .finally(() => {
              setLoading(false);
              alert('User saved');
            });
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
          value={Boolean(state.verified)}
          onChange={(value) => dispatch({ key: 'verified', value })}
        />

        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
          type="submit"
        >
          {loading ? 'Saving...' : mode === 'edit' ? 'Edit' : 'Create'}
        </button>
      </form>
    </div>
  );

  function handleChange(state: UserCreate, action: Action): UserCreate {
    return {
      ...state,
      [action.key]: action.value,
    };
  }
};

export default UserForm;

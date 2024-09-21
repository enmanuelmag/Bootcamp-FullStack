import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { UserByIndexLoaderData, UserCreate } from '@customTypes/user';

import DataRepo from '@api/datasource';

import { QKeys } from '@constants/query';

import { isLoadingMutation, isLoadingOrRefetchQuery } from '@utils/query';

import Input from '@components/Form/Input';
import Verified from '@components/Form/Verified';
import SwitchInput from '@components/Form/Check';
import NumberInput from '@components/Form/Number';

type Params = {
  index: string;
};

const INITIAL_STATE: UserCreate = {
  name: '',
  age: 25,
  city: '',
  verified: false,
};

const UserForm = () => {
  const { index } = useParams<Params>();

  const navigate = useNavigate();

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [mode] = React.useState(index ? 'edit' : 'create');

  const [state, setState] = React.useState<UserCreate>(INITIAL_STATE);

  const userQuery = useQuery<
    UserByIndexLoaderData,
    Error,
    UserByIndexLoaderData,
    [string, number]
  >({
    enabled: Boolean(index),
    queryKey: [QKeys.GET_USER_BY_INDEX, Number(index)],
    queryFn: async ({ queryKey }) => {
      return await DataRepo.loadUserByIndex(queryKey[1]);
    },
  });

  const { data } = userQuery;

  const isLoading = isLoadingOrRefetchQuery(userQuery);

  const userCreateMutation = useMutation<void, Error, UserCreate>({
    mutationFn: async (user) => {
      return await DataRepo.saveUser(user);
    },
    onSettled: (_, error) => {
      if (error) {
        alert('Error saving user');
        return;
      }

      alert('User saved');
      setState(INITIAL_STATE);
    },
  });

  const isSaving = isLoadingMutation(userCreateMutation);

  // Load user data after component is mounted
  React.useLayoutEffect(() => {
    if (mode === 'create' || !data?.user || isLoading) return;

    const { name, age, city, verified } = data.user;

    setState({
      name,
      age,
      city,
      verified: Boolean(verified),
    });
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    return () => {
      console.log('Unmounting');
      setState(INITIAL_STATE);
    };
  }, []);

  const VerifiedMemo = React.useMemo(
    () => <Verified verified={state.verified} />,
    [state.verified]
  );

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
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
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
          userCreateMutation.mutate(state);
        }}
      >
        <Input
          label="Name"
          value={state.name}
          onChange={handleChange.bind(null, 'name')}
        />

        <NumberInput
          label="Age"
          value={state.age}
          onChange={handleChange.bind(null, 'age')}
        />

        <Input
          ref={inputRef}
          label="City"
          value={state.city}
          onChange={handleChange.bind(null, 'city')}
        />

        <SwitchInput
          label="Verified"
          value={Boolean(state.verified)}
          onChange={handleChange.bind(null, 'verified')}
        />

        {VerifiedMemo}

        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
          type="submit"
        >
          {isSaving ? 'Saving...' : mode === 'edit' ? 'Edit' : 'Create'}
        </button>
      </form>
    </div>
  );

  function handleChange(
    key: keyof UserCreate,
    value: string | boolean | number
  ) {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  }
};

export default UserForm;

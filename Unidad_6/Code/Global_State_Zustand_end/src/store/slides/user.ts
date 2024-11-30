import { UserLogin } from '@customTypes/context';

export type UserState = {
  name: string;
  city: string;
  email: string;
  role: string;
};

export type StoreActions = {
  clear: () => void;
  setUser: (user: UserLogin) => void;
  setField: (field: keyof UserLogin, value: string) => void;
};

export const INITIAL_STATE: UserState = {
  name: '',
  city: '',
  email: '',
  role: '',
};

import React from 'react';
import { UserLogin } from '@customTypes/context';

export const INITIAL_USER_LOGIN: UserLogin = {
  name: 'Enmanuel',
  city: 'Manta',
  email: 'enmanuelmag@cardor.dev',
  role: 'saas-user',
};

const MyContext = React.createContext<UserLogin>(INITIAL_USER_LOGIN);

export default MyContext;

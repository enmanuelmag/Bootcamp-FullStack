import { defer } from 'react-router-dom';
import { User } from '../types/user';

const users = [
  {
    name: 'Dan Abramov',
    url: 'https://avatar.iran.liara.run/public/boy',
    verified: true,
  },
  {
    name: 'Sophie Alpert',
    url: 'https://avatar.iran.liara.run/public/girl',
    verified: false,
  },
  {
    name: 'Ryan Florence',
    url: 'https://avatar.iran.liara.run/public/girl',
  },
];

const sleep = (ms = 3000) => new Promise((resolve) => setTimeout(resolve, ms));

export type UserLoaderData = {
  users: User[];
};

export const loadUsers = async () => {
  return defer({
    users: sleep().then(() => users),
  });
};

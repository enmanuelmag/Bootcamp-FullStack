import { defer } from 'react-router-dom';
import { User } from '../types/user';

const users = [
  {
    name: 'Dan Abramov',
    url: 'https://avatar.iran.liara.run/public/boy',
    verified: true,
  },
  {
    name: 'Kent C. Dodds',
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

const sleep = (ms = 1500) => new Promise((resolve) => setTimeout(resolve, ms));

export type UserLoaderData = {
  users: User[];
};

export const loadUsers = async (state?: string) => {
  return defer({
    users: sleep().then(() =>
      users.filter((user) => (state === 'verified' ? user.verified : true))
    ),
  });
};

export type UserByIndexLoaderData = {
  user: User;
};

export const loadUserByIndex = async (index: number) => {
  return defer({
    user: sleep().then(() => users[index]),
  });
};

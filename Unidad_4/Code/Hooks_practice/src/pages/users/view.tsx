import React from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import { UserByIndexLoaderData } from '../../api/user';

import UserProfile from '../../components/UserProfile';

const UserView = () => {
  const data = useLoaderData() as UserByIndexLoaderData;

  return (
    <React.Suspense
      fallback={
        <p className="text-2xl font-bold text-center">Cargando usuario</p>
      }
    >
      <Await resolve={data.user}>
        {(user) => <UserProfile key={user.name} {...user} />}
      </Await>
    </React.Suspense>
  );
};

export default UserView;

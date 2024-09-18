import React from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import { UserLoaderData } from '../../api/user';

import UserProfile from '../../components/UserProfile';

function Users() {
  const data = useLoaderData() as UserLoaderData;

  return (
    <React.Suspense
      fallback={
        <p className="text-2xl font-bold text-center">Cargando usuarios</p>
      }
    >
      <Await resolve={data.users}>
        {(users: UserLoaderData['users']) => (
          <div className="flex flex-row gap-x-[2rem]">
            {users.map((user, index) => (
              <UserProfile key={user.name} {...user} index={index} />
            ))}
          </div>
        )}
      </Await>
    </React.Suspense>
  );
}

export default Users;

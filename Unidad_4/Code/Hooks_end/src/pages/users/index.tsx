import React from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import { UserLoaderData } from '@customTypes/user';

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
          <div>
            <div className="flex flex-col gap-y-4 w-[50rem] text-center">
              <h1 className="text-4xl font-bold">Usuarios</h1>
              <p className="text-lg">
                {users.length === 0
                  ? 'No hay usuarios'
                  : `Hay ${users.length} usuarios`}
              </p>
            </div>
            <div className="flex flex-row justify-center gap-x-[2rem] mt-[2rem]">
              {users.map((user, index) => (
                <UserProfile key={user.name} {...user} index={index} />
              ))}
            </div>
          </div>
        )}
      </Await>
    </React.Suspense>
  );
}

export default Users;

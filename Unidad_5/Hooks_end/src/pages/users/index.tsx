import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { UserLoaderData } from '@customTypes/user';

import { QKeys } from '@constants/query';

import DataRepo from '@api/datasource';

import { isLoadingOrRefetchQuery } from '@utils/query';

import UserProfile from '@components/UserProfile';

function Users() {
  const usersQuery = useQuery<UserLoaderData, Error, UserLoaderData>({
    queryKey: [QKeys.GET_USERS],
    queryFn: async () => {
      return await DataRepo.loadUsers();
    },
  });

  const { data } = usersQuery;

  const isLoading = isLoadingOrRefetchQuery(usersQuery);

  return (
    <React.Fragment>
      {isLoading && (
        <p className="text-2xl font-bold text-center">Cargando usuarios</p>
      )}
      {!isLoading && data && (
        <div>
          <div className="flex flex-col gap-y-4 w-[50rem] text-center">
            <h1 className="text-4xl font-bold">Usuarios</h1>
            <p className="text-lg">
              {data.users.length === 0
                ? 'No hay usuarios'
                : `Hay ${data.users.length} usuarios`}
            </p>
          </div>
          <div className="flex flex-row justify-center gap-x-[2rem] mt-[2rem]">
            {data.users.map((user, index) => (
              <UserProfile key={user.name} {...user} index={index} />
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Users;

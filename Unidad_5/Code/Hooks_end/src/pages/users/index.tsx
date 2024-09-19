import React from 'react';
import { Await, useAsyncValue, useLoaderData } from 'react-router-dom';

import { UserLoaderData } from '@customTypes/user';

import { usePagination } from '@hooks/pagination';

import UserProfile from '@components/UserProfile';
import { Pagination } from '@components/Pagination';

function AwaitedUsers() {
  const users = useAsyncValue() as UserLoaderData['users'];

  const { page, pageData, goToPage, totalPages } = usePagination({
    data: users,
    pageSize: 2,
  });

  return (
    <div>
      <div className="flex flex-col gap-y-4 w-[50rem] text-center">
        <h1 className="text-4xl font-bold">Usuarios</h1>
        <p className="text-lg">
          {users.length === 0
            ? 'No hay usuarios'
            : `Hay ${users.length} usuarios`}
        </p>
      </div>

      <Pagination
        currentPage={page}
        data={pageData}
        onChange={goToPage}
        renderItem={(user, index) => (
          <UserProfile key={index} {...user} index={index} />
        )}
        totalPages={totalPages}
      />
    </div>
  );
}

function Users() {
  const data = useLoaderData() as UserLoaderData;

  return (
    <React.Suspense
      fallback={
        <p className="text-2xl font-bold text-center">Cargando usuarios</p>
      }
    >
      <Await resolve={data.users}>
        <AwaitedUsers />
      </Await>
    </React.Suspense>
  );
}

export default Users;

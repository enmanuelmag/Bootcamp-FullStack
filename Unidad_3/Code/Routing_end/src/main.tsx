import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Importar BrowserRouter y RouterProvider
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { loadUsers } from './api/user';

import Layout from './components/Layout';

import Home from './pages/home';

import Users from './pages/users';
import ErrorUser from './pages/users/error';

import './index.css';

// Crear el BrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'users',
        loader: loadUsers,
        element: <Users />,
        errorElement: <ErrorUser />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Añadir el RouterProvider con el router */}
    <RouterProvider router={router} />
  </StrictMode>
);

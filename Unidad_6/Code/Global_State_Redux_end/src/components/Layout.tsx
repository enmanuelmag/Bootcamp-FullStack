import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useAppSelector } from '@hooks/store';

import { selectUserRole } from '@store/slice/user';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const role = useAppSelector(selectUserRole);

  React.useEffect(() => {
    if (role === 'user' && location.pathname.includes('users/form')) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, role]);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default Layout;

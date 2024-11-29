import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import MyContext from '@context/index';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { role } = React.useContext(MyContext);

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
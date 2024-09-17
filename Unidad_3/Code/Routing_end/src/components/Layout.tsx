import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default Layout;

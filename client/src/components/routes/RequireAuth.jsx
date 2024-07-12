import { Outlet } from 'react-router';

export const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log(token);

  if (!token) {
    return <div>You must be logged in to view this page.</div>;
  }

  return children ? children : <Outlet />;
};

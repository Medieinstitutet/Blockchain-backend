import { createBrowserRouter } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { Layout } from './components/routes/layout';
import { NotFound } from './components/routes/NotFound';
import { Blockchain } from './components/pages/Blocks/Blockchain';
import { Account } from './components/pages/Wallet/Account';
import { SendTransaction } from './components/pages/Transactions/SendTransaction';
import { Register } from './components/pages/Authentication/Register/Register';
import { Login } from './components/pages/Authentication/Login/Login';
import { RequireAuth } from './components/routes/RequireAuth';
import { Logout } from './components/pages/Authentication/Logout/Logout';
import { ListTransactions } from './components/pages/Transactions/ListTransactions';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/account',
        element: (
          <RequireAuth>
            <Account />
          </RequireAuth>
        ),
      },
      {
        path: '/blockchain',
        element: (
          <RequireAuth>
            <Blockchain />
          </RequireAuth>
        ),
      },
      {
        path: '/transaction',
        element: (
          <RequireAuth>
            <SendTransaction />
          </RequireAuth>
        ),
      },
      {
        path: '/transactions',
        element: (
          <RequireAuth>
            <ListTransactions />
          </RequireAuth>
        ),
      },
      {
        path: '/logout',
        element: <Logout />,
      },
    ],
  },
]);

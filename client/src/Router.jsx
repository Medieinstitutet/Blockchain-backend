import { createBrowserRouter } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { Layout } from "./components/routes/layout";
import { NotFound } from "./components/routes/NotFound";
import { Blockchain } from "./components/pages/Blocks/Blockchain";
import { Account } from "./components/pages/Wallet/Account";
import { SendTransaction } from "./components/pages/Transactions/SendTransaction";
import { Register } from "./components/pages/Authentication/Register/Register";
import { Login } from "./components/pages/Authentication/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/blockchain',
        element: <Blockchain />
      },
      {
        path: '/account',
        element: <Account />
      },
      {
        path: '/transaction',
        element: <SendTransaction />
      },
    ]
  }
]);
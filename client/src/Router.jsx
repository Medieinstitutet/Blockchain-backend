import { createBrowserRouter } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { Layout } from "./components/routes/layout";
import { NotFound } from "./components/routes/NotFound";
import { Blockchain } from "./components/pages/Blocks/Blockchain";
import { Account } from "./components/pages/Wallet/Account";
import { SendTransaction } from "./components/pages/Transactions/SendTransaction";
import { Register } from "./components/pages/Authentication/Register";

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
      {
        path: '/register',
        element: <Register />
      },
    ]
  }
]);
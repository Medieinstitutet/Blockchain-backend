import { createBrowserRouter } from "react-router-dom";

import { Home } from "./components/pages/Home";
import { Layout } from "./components/routes/layout";
import { NotFound } from "./components/routes/NotFound";
import { Blockchain } from "./components/pages/Blocks/Blockchain";

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
      }
    ]
  }
]);
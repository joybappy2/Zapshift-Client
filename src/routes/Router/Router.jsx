import { createBrowserRouter } from "react-router";
import RootLayout from "../../layouts/RootLayout/RootLayout";
import Home from "../../pages/Home/Home";
import Coverage from "../../pages/Home/Coverage/Coverage";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import Register from "../../pages/Register/Register";
import Revision from "../../pages/Revision";
import Login from "../../pages/Login/Login";
import BeARider from "../../pages/BeARider/BeARider";
import PrivateRoute from "../PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
      },
      {
        path: "be-a-rider",
        element: (
          <PrivateRoute>
            <BeARider />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },

  {
    path: "ron",
    Component: Revision,
  },
]);

export default router;

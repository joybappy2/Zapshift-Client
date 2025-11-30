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
import SendAParcel from "../../pages/SendAParcel/SendAParcel";
import DashboardLayout from "../../layouts/RootLayout/DashboardLayout";
import MyParcels from "../../pages/Dashboard/MyParcels/MyParcels";

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

      {
        path: "send-a-parcel",
        element: (
          <PrivateRoute>
            <SendAParcel></SendAParcel>
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
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <h2>Welcome to Dashboard</h2>,
      },
      {
        path: "my-parcels",
        Component: MyParcels,
      },
    ],
  },

  {
    path: "ron",
    Component: Revision,
  },
]);

export default router;

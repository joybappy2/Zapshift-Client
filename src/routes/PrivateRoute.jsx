import React, { use } from "react";
import { AuthContext } from "../Authentication/AuthContext/AuthContext";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loadingUser } = use(AuthContext);

  if (loadingUser) {
    return <span className="loading-dots loading-xl text-primary"></span>;
  }

  if (!user) {
    return Navigate("/login");
  }

  return children;
};

export default PrivateRoute;

import React, { use } from "react";
import { AuthContext } from "../Authentication/AuthContext/AuthContext";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loadingUser } = use(AuthContext);

  if (loadingUser) {
    return (
      <div className="min-h-[calc(100vh-400px)] flex justify-center items-center">
        <span className="loading loading-bars loading-xl text-[#caeb66]"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;

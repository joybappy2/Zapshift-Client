import React from "react";
import useRole from "../../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return (
      <span className="text-5xl font-bold animate-spin">Loading Role...</span>
    );
  }

  if (role.role != "admin") {
    return (
      <h2 className="text-4xl font-bold text-center">
        Forbidden Access <br /> You are not Admin
      </h2>
    );
  }

  return children;
};

export default AdminRoute;

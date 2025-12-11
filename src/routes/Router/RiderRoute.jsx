import React from "react";
import useRole from "../../hooks/useRole";

const RiderRoute = ({ children }) => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return (
      <span className="text-5xl font-bold animate-spin">Loading Role...</span>
    );
  }

  if (role.role !== "rider") {
    return (
      <h2 className="text-4xl font-bold text-center">
        Forbidden Access <br /> You are not Admin
      </h2>
    );
  }

  return children;
};

export default RiderRoute;

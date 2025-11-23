import { use } from "react";
import { AuthContext } from "../Authentication/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loadingUser } = use(AuthContext);
  const location = useLocation();
  console.log("location", location);

  if (loadingUser) {
    return (
      <div className="min-h-[calc(100vh-400px)] flex justify-center items-center">
        <span className="loading loading-bars loading-xl text-[#caeb66]"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  }

  return children;
};

export default PrivateRoute;

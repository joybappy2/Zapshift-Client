import { use } from "react";
import { AuthContext } from "../Authentication/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router";
import { FaFan } from "react-icons/fa";

const PrivateRoute = ({ children }) => {
  const { user, loadingUser } = use(AuthContext);
  const location = useLocation();
  // console.log("location", location);

  if (loadingUser) {
    return (
      <div>
        <div className="min-h-screen flex justify-center items-center">
          <FaFan size={100} className="animate-spin text-primary"></FaFan>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  }

  return children;
};

export default PrivateRoute;

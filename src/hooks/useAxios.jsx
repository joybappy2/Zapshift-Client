import axios from "axios";
import { use, useEffect } from "react";
import { AuthContext } from "../Authentication/AuthContext/AuthContext";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxios = () => {
  const { user, logout } = use(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;

      return config;
    });

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          logout().then(() => {
            navigate("/login");
          });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logout, navigate]);

  return axiosSecure;
};

export default useAxios;

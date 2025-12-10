import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { AuthContext } from "../Authentication/AuthContext/AuthContext";
import useAxios from "./useAxios";

const useRole = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxios();

  const { data: role = "user", isLoading: roleLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}/role`);
      return res.data;
    },
  });

  return { role, roleLoading };
};

export default useRole;

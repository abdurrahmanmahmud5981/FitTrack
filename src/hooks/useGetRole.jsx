

import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "react-query";

const useGetRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  console.log(user);
  const { data: role = "member", isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/role/${user?.email}`);
      console.log(data);
      return data;
    },
  });
  return [role, isLoading];
};

export default useGetRole;


import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useIsAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin = false, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: user !== null && !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(`/user/admin?email=${user?.email}`);
      return response.data?.isAdmin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useIsAdmin;
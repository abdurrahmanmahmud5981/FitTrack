import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useIsAdmin = () => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: isAdmin = false, isPending: isAdminLoading } = useQuery({
    queryKey: [ user && user?.email, "isAdmin"],
    enabled: !!user && !!user.email && !loading, // Only fetch if user and user.email exist and not loading
    queryFn: async () => {
      const response = await axiosPublic.get(`/user/admin?email=${user?.email}`);
      return response.data?.isAdmin ;    
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useIsAdmin;
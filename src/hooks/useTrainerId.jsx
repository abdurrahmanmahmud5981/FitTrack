
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "react-query";

const useTrainerId = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { data: trainerId = "member", isLoading } = useQuery({
    queryKey: ["trainerId", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/role/${user?.email}`);
      return data;
    },
  });
  console.log( ' in hokkkk', );

  return [trainerId, isLoading];
};

export default useTrainerId;
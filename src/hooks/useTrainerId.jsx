

import useAuth from "./useAuth";
import { useQuery } from "react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTrainerId = () => {
  const axiosPublic = useAxiosPublic();
  const { user, loading } = useAuth();
  const { data: trainerId = "member", isLoading } = useQuery({
    queryKey: ["trainerId", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const { data } = await axiosPublic(`/users/role/${user?.email}`);
      return data;
    },
  });
  return [trainerId, isLoading];
};

export default useTrainerId;
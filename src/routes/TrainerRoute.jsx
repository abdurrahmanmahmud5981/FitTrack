import { Navigate } from "react-router-dom";
import useGetRole from "../hooks/useGetRole";
import useAuth from "../hooks/useAuth";

const TrainerRoute = ({ children }) => {
  const [role, isLoading] = useGetRole();
  const { user, loading } = useAuth();
  console.log("Trainer route", role);
  if (loading || isLoading) return <h4>Loding...</h4>;
  if (user?.email && role === "trainer") return children;
  return <Navigate to="/dashboard/profile" replace="true" />;
};

export default TrainerRoute;

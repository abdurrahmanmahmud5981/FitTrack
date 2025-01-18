import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useGetRole from "../hooks/useGetRole";

// eslint-disable-next-line react/prop-types
const MemberRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useGetRole();
  console.log("member route", role);
  if (loading || isLoading) return <h4>Loding...</h4>;
  if (user?.email && role === "member") return children;
  return <Navigate to="/dashboard/profile" replace="true" />;
};

export default MemberRoute;

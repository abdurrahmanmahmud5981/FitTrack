import { Navigate } from "react-router-dom";

import useGetRole from "../hooks/useGetRole";
import useAuth from "../hooks/useAuth";

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useGetRole();
  console.log("admin route", role);
  if (loading || isLoading) return <h4>Loding...</h4>;
  if (user?.email && role === "admin") return children;
  return <Navigate to="/dashboard/profile" replace="true" />;
};

export default AdminRoute;

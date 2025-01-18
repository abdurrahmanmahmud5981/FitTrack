import { Navigate } from "react-router-dom";

import useGetRole from "../hooks/useGetRole";

const AdminRoute = ({children}) => {
    const [role, isLoading] = useGetRole();
  console.log('admin route', role);
    if (isLoading) return <h4>Loding...</h4>
    if (role === 'admin') return children
    return <Navigate to='/dashboard' replace='true' />
  }

export default AdminRoute;
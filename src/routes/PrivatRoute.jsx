import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from '../components/shared/LodingSpinner';


// eslint-disable-next-line react/prop-types
const PrivatRoute = ({children}) => {
    const {user,loading} = useAuth()
    const location = useLocation()
    if (loading) return  <LoadingSpinner/>
    if (user) return children
    return <Navigate to={'/login'} state={{from:location}} replace='true'></Navigate>
};

export default PrivatRoute;
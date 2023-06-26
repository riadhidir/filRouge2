import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt_decode from 'jwt-decode';
import roles from "../config/roles";
const Redirector = ({ allowedRoles }) => {
    
    const { auth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate()
    
    const paths= {
        "e114" : <Navigate to="/" state={{ from: location }} replace />,
          "dcac": <Navigate to="/statistics" state={{ from: location }} replace />,
          "68d0" : <Navigate to="/teacher" state={{ from: location }} replace />,
          "c128" : <Navigate to="/librarian" state={{ from: location }} replace />,
             
    }
    const decode = auth?.accessToken ?  jwt_decode(auth.accessToken): undefined;

    
    const role = decode?.UserInfo?.role || undefined ;
    if(auth == null){
       return <Navigate to="/login" state={{ from: location }} replace />
    }else{
        return (
       paths[role]
    )
    }
    

    
}

export default Redirector;
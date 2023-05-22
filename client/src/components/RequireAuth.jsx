import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt_decode from 'jwt-decode';
import { useEffect } from "react";
// import 'flowbite';
const RequireAuth = ({ allowedRoles }) => {
    
    const { auth , setAuth} = useAuth();
    const location = useLocation();
    
    const decode = auth?.accessToken ?  jwt_decode(auth.accessToken): undefined;
    // console.log(decode);
    // console.log(decode?.UserInfo?.role);
    // console.log(allowedRoles.includes(decode?.UserInfo?.role)); 
    
    const role = decode?.UserInfo?.role || undefined ;
    const state =  allowedRoles?.includes(role);


    return (
        
        allowedRoles?.includes(role) 
        ?
         <Outlet/> 
      
        : 
        // <Outlet/>
        auth?.accessToken
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />

    )

    // return (
    //     auth?.roles?.find(role => allowedRoles?.includes(role))
    //         ? <Outlet />
    //         : auth?.username
    //             ? <Navigate to="/unauthorized" state={{ from: location }} replace />
    //             : <Navigate to="/login" state={{ from: location }} replace />
    // );
}

export default RequireAuth;
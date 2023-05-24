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
    const uni = decode?.UserInfo?.uni;
    useEffect(()=>{
        setAuth(prevAuth =>{
            return {...prevAuth, role,uni}
        } )
        // console.log(uni)
    },[]);
    // useEffect(()=>{
       
    //     console.log(auth)
    // },[auth]);
 

// console.log(decode)
    return (
        
        allowedRoles?.includes(role) 
        ?
         <Outlet/> 
        // <h1>oylet</h1>
      
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
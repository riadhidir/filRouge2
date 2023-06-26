import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import Loader from "./Loader";


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    // const { auth, persist } = useAuth();
    const { auth } = useAuth();
    // const {userId, userRole, userUni} = useUserCredentials();
    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }
        // console.log(auth?.role)
        // persist added here AFTER tutorial video
        // Avoids unwanted call to verifyRefreshToken
        // !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
        !auth?.accessToken  ? verifyRefreshToken() : setIsLoading(false);
        return () => isMounted = false;
    }, []);



    // useEffect(() => {
    //     // console.log(`isLoading: ${isLoading}`)
    //     // console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    // }, [isLoading])

    return (
        <>
                 {/* <Outlet /> */}

            {
            // !persist
            //     ? <Outlet />
                isLoading
                    ? <Loader/>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin
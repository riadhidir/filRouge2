
import useAuth from "./useAuth";
// import useAxiosPrivate from "./useAxiosPrivate";
import {api} from '../api/axios.js';
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const { setAuth } = useAuth();
    // const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const logout = async () => {
        setAuth({});
        try {
            const response = await api.patch('/auth/logout', {
                withCredentials: true
            });
            
            
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout
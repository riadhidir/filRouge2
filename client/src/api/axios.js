import axios from 'axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
 export const  api =   axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        "Content-Type": 'application/json'
    },
    withCredentials: true
});

export const axiosPrivate =   axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        "Content-Type": 'application/json'
    },
    withCredentials: true
});



export const registerAdmin = (data) => {
    return api.post('/auth/admin-register',data);
}
export const login = (data) => {
    return api.post('/auth/login',data);
}
// export const logout = ()=>{
//     return api.patch('/auth/logout');
// }




export default api;
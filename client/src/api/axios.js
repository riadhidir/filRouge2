import axios from 'axios';
// import useAxiosPrivate from '../hooks/useAxiosPrivate';
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



export const registerAdmin = async (data) => {
    return  await api.post('/auth/admin-register',data);
}
export const login = async (data) => {
    return await api.post('/auth/login',data);
}
export const resetToken = async (data) => {
    return  await api.post(`/auth/reset-token`, data);
}

export const resetPassword = async (data)=>{
    return await api.patch(`/auth/reset-password?token=${data.token}`,{password: data.password});
}

export const downloadDocument = async (id) => {
    console.log(id)
    return await api.put(`/library/Documents/${id}`);
}
// export const logout = ()=>{
//     return api.patch('/auth/logout');
// }




export default api;
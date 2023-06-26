import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../api/axios.js";
import useAuth from "../hooks/useAuth";


const Login = () => {
    const { auth, setAuth } = useAuth();
 
    const navigate = useNavigate();
    const location = useLocation();
    
    const from = location.state?.from?.pathname || "/";
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [isPasswordHidden, setPasswordHidden] = useState(true);

    useEffect(() => {
        setErrMsg("");
    }, [email, password]);

    const loginMutation = useMutation(login, {
        onSuccess: (response) => {
            // window.location.href = "/";
            const {accessToken} = response.data;
            // console.log(response.data);
            setAuth({accessToken});
            navigate('/redirector', {replace: true});
        },
        onError: (error) => {
            setErrMsg(error.response.data.message);
        },
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation.mutate({
            email,
            password,
        });
        // console.log(email, password);
    };
    useEffect(()=>{
        auth == null || navigate('/redirector');
    
    },[auth]);
    return  (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full text-gray-600">
                <div className="text-center">
                    <img
                        src="/logo_3.png"
                        width={150}
                        className="mx-auto"
                    />
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                            Log in to your account
                        </h3>
                        <p className="">
              
  
                            <Link
                                to="/signup"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <p
                        className={`mt-2 text-lg  text-red-600 dark:text-red-500 ${
                            errMsg ? "block" : "hidden"
                        } `}
                    >
                        <span className="font-medium">Oh, snapp!</span> {errMsg}
                    </p>
                    <div>
                        <label className="text-gray-600">Email</label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
        
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="text-gray-600">Password</label>
                        <div className="relative  mt-2">
                            <button
                                type="button"
                                className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
                                onClick={() =>
                                    setPasswordHidden(!isPasswordHidden)
                                }
                            >
                                {isPasswordHidden ? (
                                    <svg
                                        className="w-6 h-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                        />
                                    </svg>
                                )}
                            </button>

                            {/* <FontAwesomeIcon icon="fa-light fa-eye" /> */}
                            <input
                                type={isPasswordHidden ? "password" : "text"}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                        Sign in
                    </button>
                    <div className="text-center">
                        <Link to={"/reset-password"} className="hover:text-indigo-600">
                            Forgot password?
                        </Link>
                    </div>
                </form>
            </div>



        </main>
    );
};
export default Login;

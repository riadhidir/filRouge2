import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { login, resetToken } from "../api/axios.js";
import useAuth from "../hooks/useAuth.jsx";


const Login = () => {
   
    
    const [email, setEmail] = useState("");
    const [resend, setResend] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        setErrMsg("");
        setSuccessMsg("");
        setResend(false)

    }, [email]);

    const resetMutation = useMutation(resetToken,
        {
            onSuccess: (response) => {
                // window.location.href = "/";
                // const { accessToken } = response.data;
                // console.log(response.data);
                // navigate("/login", { replace: true });
                setSuccessMsg("Check your email inbox")
                setResend(true)
            },
            onError: (error) => {
                setErrMsg(error.response.data.message);
                setResend(false)

            },
        }
    );
    const handleSubmit = (e) => {
        e.preventDefault();
        resetMutation.mutate({email});
        // console.log(email, password);
    };
    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full text-gray-600">
                <div className="text-center">
                    <img
                        src="https://floatui.com/logo.svg"
                        width={150}
                        className="mx-auto"
                    />
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                            Reset Password
                        </h3>
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
                    <p
                        className={`mt-2 text-lg  text-green-600 dark:text-green-500 ${
                            successMsg ? "block" : "hidden"
                        } `}
                    >
                        <span className="font-medium">Success!</span> {successMsg}
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
                  
                    <button
                    
                        type="submit"
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                       {resend? "resend Link" : "Get reset link" }
                    </button>
                   
                </form>
            </div>



        </main>
    );
};
export default Login;

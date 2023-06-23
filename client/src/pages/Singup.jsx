import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import { registerAdmin } from "../api/axios";
const NAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const NAME_REGEX = /^[a-zA-Z\-]+$/;
const PHONE_REGEX = /^\d{9,10}$/;
const Signup = () => {
    const [f_name, setF_name] = useState("");
    const [validF_name, setValidF_name] = useState(false);

    const [l_name, setL_name] = useState("");
    const [validL_name, setValidL_name] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);

    const [phone, setPhone] = useState("");
    const [validPhone, setValidPhone] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);

    const [university, setUniversity] = useState("");
    const [validUniversity, setValidUniversity] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [numAccounts, setNumAccounts] = useState(50);

    useEffect(() => {
        setValidL_name(NAME_REGEX.test(l_name));
    }, [l_name]);
    useEffect(() => {
        setValidF_name(NAME_REGEX.test(f_name));
    }, [f_name]);
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);
    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone));
    }, [phone]);
    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd]);

    useEffect(() => {
        setValidUniversity(university.length > 0);
    }, [university]);
    useEffect(() => {
        setErrMsg("");
    }, [f_name, university, l_name, email, phone, password, matchPwd]);

    const registerMutation = useMutation(registerAdmin, {
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            if (!error?.response) {
                setErrMsg("No Server Response");
            } else {
                setErrMsg(error.response.data.message);
            }
        },
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        registerMutation.mutate({
            f_name,
            l_name,
            email,
            password,
            phone,
            university,
            accounts: numAccounts,
        });
    };

    return (
        <main className="w-full flex ">
            <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex ">
                <div className="relative z-10 w-full max-w-md">
                    <img src="https://floatui.com/logo-dark.svg" width={150} />
                    <div className=" mt-16 space-y-3">
                        <h3 className="text-white text-3xl font-bold">
                            Start growing your business quickly
                        </h3>
                        <p className="text-gray-300">
                            Create an account and get access to all features for
                            30-days, No credit card required.
                        </p>
                        <div className="flex items-center -space-x-2 overflow-hidden">
                            <img
                                src="https://randomuser.me/api/portraits/women/79.jpg"
                                className="w-10 h-10 rounded-full border-2 border-white"
                            />
                            <img
                                src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
                                className="w-10 h-10 rounded-full border-2 border-white"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f"
                                className="w-10 h-10 rounded-full border-2 border-white"
                            />
                            <img
                                src="https://randomuser.me/api/portraits/men/86.jpg"
                                className="w-10 h-10 rounded-full border-2 border-white"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
                                className="w-10 h-10 rounded-full border-2 border-white"
                            />
                            <p className="text-sm text-gray-400 font-medium translate-x-5">
                                Join 5.000+ users
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute inset-0 my-auto h-[500px]"
                    style={{
                        background:
                            "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
                        filter: "blur(118px)",
                    }}
                ></div>
            </div>

            {/* overflow here */}
            <div className="flex-1 flex items-center justify-center h-[100vh] overflow-y-scroll  ">
                <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0 h-full  ">
                    <div className="">
                        <img
                            src="https://floatui.com/logo.svg"
                            width={150}
                            className="lg:hidden"
                        />
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                                Sign up
                            </h3>
                            <p className="">
                                Already have an account?{" "}
                                <Link to="/login"
                                    
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5 py-5 ">
                        <p
                            className={`mt-2 text-sm text-red-600 dark:text-red-500 ${
                                errMsg ? "block" : "hidden"
                            } `}
                        >
                            <span className="font-medium">Oh, snapp!</span>{" "}
                            {errMsg}
                        </p>
                        <div className="flex gap-4">
                            <div>
                                <label className="font-medium">
                                    First name
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className={
                                            validF_name
                                                ? "ml-1 inline text-green-600"
                                                : "hidden"
                                        }
                                    />
                                    <FontAwesomeIcon
                                        icon={faTimes}
                                        className={
                                            validF_name || !f_name
                                                ? "hidden"
                                                : "ml-1 inline text-red-600"
                                        }
                                    />
                                </label>
                                <input
                                    onChange={(e) => {
                                        setF_name(e.target.value);
                                    }}
                                    type="text"
                                    placeholder="John"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    autoFocus
                                />
                            </div>

                            <div>
                                <label className="font-medium">
                                    Last name
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className={
                                            validL_name
                                                ? "ml-1 inline text-green-600"
                                                : "hidden"
                                        }
                                    />
                                    <FontAwesomeIcon
                                        icon={faTimes}
                                        className={
                                            validL_name || !l_name
                                                ? "hidden"
                                                : "ml-1 inline text-red-600"
                                        }
                                    />
                                </label>
                                <input
                                    onChange={(e) => {
                                        setL_name(e.target.value);
                                    }}
                                    type="text"
                                    placeholder="Doe"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="font-medium">
                                University name
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={
                                        validUniversity
                                            ? "ml-1 inline text-green-600"
                                            : "hidden"
                                    }
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={
                                        validUniversity || !university
                                            ? "hidden"
                                            : "ml-1 inline text-red-600"
                                    }
                                />
                            </label>
                            <input
                                onChange={(e) => {
                                    setUniversity(e.target.value);
                                }}
                                type="text"
                                placeholder="University of Boumerdes"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">
                                Number of Accounts
                            </label>

                            <select
                                onChange={(e) => {
                                    setNumAccounts(e.target.value);
                                    console.log(numAccounts);
                                }}
                                defaultValue={50}
                                id="small"
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            >
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={200}>200</option>
                            </select>
                        </div>
                        <div>
                            <label className="font-medium">
                                Email address
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={
                                        validEmail
                                            ? "ml-1 inline text-green-600"
                                            : "hidden"
                                    }
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={
                                        validEmail || !email
                                            ? "hidden"
                                            : "ml-1 inline text-red-600"
                                    }
                                />
                            </label>
                            <input
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                type="email"
                                placeholder="johnDoe@gmail.com"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="font-medium">
                                Phone number
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={
                                        validPhone
                                            ? "ml-1 inline text-green-600"
                                            : "hidden"
                                    }
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={
                                        validPhone || !phone
                                            ? "hidden"
                                            : "ml-1 inline text-red-600"
                                    }
                                />
                            </label>
                            <div className="flex mt-2">
                                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    +213
                                </span>
                                <input
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                    }}
                                    type="tel"
                                    placeholder="0a1dd7228f2d"
                                    required
                                    className="w-full  px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-r-lg"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="font-medium">
                                Password
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={
                                        validPassword
                                            ? "ml-1 inline text-green-600"
                                            : "hidden"
                                    }
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={
                                        validPassword || !password
                                            ? "hidden"
                                            : "ml-1 inline text-red-600"
                                    }
                                />
                            </label>
                            <input
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                type="password"
                                placeholder="********"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">
                                Confirm Password
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={
                                        validMatch && matchPwd
                                            ? "ml-1 inline text-green-600"
                                            : "hidden"
                                    }
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={
                                        validMatch || !matchPwd
                                            ? "hidden"
                                            : "ml-1 inline text-red-600"
                                    }
                                />
                            </label>
                            <input
                                onChange={(e) => {
                                    setMatchPwd(e.target.value);
                                }}
                                type="password"
                                placeholder="********"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <button
                            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 disabled:bg-indigo-300"
                            disabled={
                                validEmail &&
                                validF_name &&
                                validL_name &&
                                validPassword &&
                                validMatch &&
                                validPhone &&
                                validUniversity
                                    ? false
                                    : true
                            }
                        >
                            Create account
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Signup;

import React, { useEffect, useState } from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import useNotification from "../../../hooks/useNotification";
const NAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{9,10}$/;
const CreateUserModal = ({ show, setShow, refetch, role }) => {
    const notify = useNotification();
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const university = auth.uni;

    const [f_name, setF_name] = useState("");
    const [validF_name, setValidF_name] = useState(false);

    const [l_name, setL_name] = useState("");
    const [validL_name, setValidL_name] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);

    const [phone, setPhone] = useState("");
    const [validPhone, setValidPhone] = useState(false);

    const [errMsg, setErrMsg] = useState("");

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
        setErrMsg("");
    }, [f_name, university, l_name, email, phone,show]);

    const registerMutation = useMutation(
        (body) => {
            return axiosPrivate.post(`/auth/register`, body);
        },
        {
            onSuccess: (data) => {
                refetch();
                resetInputForm();
                setShow(false);
                notify('success')
            },
            onError: (error) => {
                if (!error?.response) {
                    setErrMsg("No Server Response");
                } else {
                    setErrMsg(error.response.data.message);
                }
            },
        }
    );
    
    const handleSubmit = (e) => {
        e.preventDefault();
        registerMutation.mutate({
            f_name,
            l_name,
            email,
            phone,
            university,
            role,
        });
    };
    const resetInputForm = () => {
        setF_name("");
        setL_name("");
        setEmail("");
        setPhone("");
    };
    return (
        <>
            {/* // <!-- Main modal --> */}
            <div
                onClick={(e) => {
                    setShow(false);
                }}
                className={`overflow-y-auto overflow-x-hidden ${
                    show ? "fixed" : "hidden"
                } top-0 right-0 bg-[#000000a5] left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full`}
            >
                <div
                    onClick={(e)=>e.stopPropagation()}
                    className="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto mt-40 lg:mt-20"
                >
                    {/* <!-- Modal content --> */}
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        {/* <!-- Modal header --> */}
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Add Teacher
                                <p
                                    className={`mt-2 ml-2 text-lg lg:inline text-red-600 dark:text-red-500 ${
                                        errMsg ? "block" : "hidden"
                                    } `}
                                >
                                    <span
                                        className={`font-medium  ${
                                            errMsg ? "inline-block" : "hidden"
                                        } `}
                                    >
                                        Oh, snapp!
                                    </span>
                                    {` ${errMsg}`}
                                </p>
                            </h3>
                            <button
                                onClick={() => setShow(false)}
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="defaultModal"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="lname"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Last Name
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
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setL_name(e.target.value)
                                        }
                                        id="lname"
                                        name="lname"
                                        value={l_name}
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="fname"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        First Name
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
                                        onChange={(e) =>
                                            setF_name(e.target.value)
                                        }
                                        autoComplete="off"
                                        value={f_name}
                                        type="text"
                                        id="fname"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                        placeholder="John"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
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
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        type="email"
                                        id="email"
                                        autoComplete="off"
                                        value={email}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                        placeholder="johnDoe@gmail.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Phone
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
                                    <input
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                        type="tel"
                                        id="phone"
                                        autoComplete="off"
                                        value={phone}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                        placeholder="05501234567"
                                        required
                                    />
                                </div>
                            </div>
                            <div
                                className="relative"
                                data-te-dropdown-ref
                            ></div>
                            <button
                                type="submit"
                                disabled={
                                    validEmail &&
                                    validF_name &&
                                    validL_name &&
                                    validPhone
                                        ? false
                                        : true
                                }
                                className="text-white inline-flex items-center bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800  disabled:bg-indigo-400"
                            >
                                <svg
                                    className="mr-1 -ml-1 w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                Add new Teacher
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateUserModal;

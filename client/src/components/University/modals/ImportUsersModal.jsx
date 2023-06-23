import React, { useEffect, useRef, useState } from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
// import template from '/template.xlsx'
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import useNotification from "../../../hooks/useNotification";
import { Link } from "react-router-dom";

const CreateUserModal = ({ show, setShow,refetch,role }) => {
    const notify = useNotification();

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const university = auth.uni;
    const [file, setFile] = useState({});
    // const [validFile, setValidFile] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const  fileRef = useRef(); 

    useEffect(() => {
        setErrMsg("");
        console.log(file);
    }, [file]);
    var formData = new FormData();
    const uploadMutation = useMutation(
        (body) => {
            return axiosPrivate.post(`/auth/register_many`, body, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        },
        {
            onSuccess: (data) => {
                refetch();
                resetInputForm();
                setShow(false);
                notify('success');
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
        formData.append("data", file);
        formData.append("university", university);
        formData.append("role", role);
        uploadMutation.mutate(formData);
    };
    const resetInputForm = () => {
        setFile({});
        fileRef.current.value = "";
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
                    onClick={(e) => e.stopPropagation()}
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
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="flex items-center justify-center w-full">
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            aria-hidden="true"
                                            className="w-10 h-10 mb-3 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            ></path>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <button className="font-semibold">
                                                Click to upload
                                            </button>
                                            <span> or drag and drop</span>
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {file.name}
                                        </p>
                                    </div>
                                    <input
                                    className="hidden"
                                          ref={fileRef}
                                          onChange={(e) => setFile(e.target.files[0])}
                                          type="file"
                                          name=""
                                          id="dropzone-file"
                                          required  
                                    />
                                </label>
                                {/* <input
                                ref={fileRef}
                                    onChange={(e) => setFile(e.target.files[0])}
                                    type="file"
                                    name=""
                                    id=""
                                    required       
                                /> */}
                            </div>
                            <p>
                                dont have the template?{" "}
                                <span className="text-indigo-500">
                                    <Link  to={'/template.xlsx'} download target="_blank" > Click here</Link>
                                </span>
                            </p>
                            <button
                                type="submit"
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
                                Add 
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateUserModal;

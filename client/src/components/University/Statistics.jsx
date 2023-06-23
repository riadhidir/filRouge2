import React, { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faBuildingColumns,
    faFile,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";
import Doughnut from "../charts/Doughnut";
import Bar from "../charts/Bar";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
//  import {roles} from '../../config/roles.js'

import { faBuilding } from "@fortawesome/free-solid-svg-icons";
const roles = {
    e114: "Super Admin",
    dcac: "Admins",
    "68d0": "Teachers",
    c128: "Librarians",
    "28c6": "Students",
};

const Statistics = () => {
    useEffect(() => {
        defineElement(lottie.loadAnimation);
    }, []);

    const {auth} = useAuth();
    const university = auth?.uni;

    const axiosPrivate = useAxiosPrivate();

    const {
        data: stats,
        isError,
        error,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery(["stats"], async () => {
         if (university == undefined) {
             return <></>;
         }
        // console.log("refetch");
        const response = await axiosPrivate.get(
            `/statistics/${university}`
        );
        //  setPages(response.data.totalPages);
        
        console.log(response.data);
        return response.data;
    });

    // const {auth} = useAuth();

    const universityData = {
        labels: stats?.Universities.states.map((item) => item._id),

        datasets: [
            {
                //   data: [ stats?.Universities?.states[0].count , stats?.Universities.states[1].count],
                data: stats?.Universities.states.map((item) => item.count),
                backgroundColor: ["#4f46e5", "#a5b4fc"],
                barPercentage: 1,

                maxBarThickness: 30,
            },
        ],
    };
    const userData = {
        labels: stats?.Users.roles
            .filter((item) => roles[item._id] !== "Super Admin")
            .map((item) => roles[item._id]),

        datasets: [
            {
                // data: stats?.Users.roles.map((item) => item.count),
                data: stats?.Users.roles
                    .filter((item) => roles[item._id] !== "Super Admin")
                    .map((item) => item.count),
                backgroundColor: ["#6366f1", "#8b5cf6", "#a855f7"],
                // borderColor: ["#818cf8", "#c7d2fe", "#4f46e5"],
                // borderWidth: 1,
            },
        ],
    };

    const userData2 = {
        labels: stats?.Users.states.map((item) => item._id),
        datasets: [
            {
                data: stats?.Users.states.map((item) => item.count),
                backgroundColor: ["#4f46e5", "#a5b4fc"],
                // borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                // borderWidth: 1,
            },
        ],
    };

    const documentData = {
        labels: stats?.Documents.types.map((item) => item._id),

        datasets: [
            {
                data: stats?.Documents.types.map((item) => item.count),
                backgroundColor: ["#6366f1", "#8b5cf6", "#a855f7"],
            },
        ],
    };

    return (
        <>
            <section className=" ">
           
                
                <div className="grid lg:grid-cols-12 gap-5   ">
                    <div className="flex  flex-row-reverse group col-span-12 lg:col-span-3 bg-white shadow-md  items-center px-5 rounded-lg  h-20 hover:bg-indigo-600  transition-all ">
                        <div className="w-full h-full  flex justify-end bg-inherit  ">
                            <svg
                                fill="none"
                                className="w-10 bg-inherit stroke-gray-400 group-hover:stroke-white"
                                stroke=""
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                                ></path>
                            </svg>
                        </div>
                        <div className="w-[60%] h-full flex flex-col items-baseline justify-center ">
                            <p className=" text-2xl text-indigo-600 group-hover:text-white">
                                {stats?.Universities?.count}
                            </p>
                            <p className="text-lg text-gray-400 group-hover:text-white">
                                Universities
                            </p>
                        </div>
                    </div>
                    <div className="flex  flex-row-reverse group col-span-12 lg:col-span-3 bg-white shadow-md  items-center px-5 rounded-lg  h-20 hover:bg-indigo-600  transition-all ">
                        <div className="w-full h-full  flex justify-end bg-inherit  ">
                            <svg
                                className="w-10 bg-inherit stroke-gray-400 group-hover:stroke-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                ></path>
                            </svg>
                        </div>
                        <div className="w-[60%] h-full flex flex-col items-baseline justify-center ">
                            <p className="text-2xl text-indigo-600 group-hover:text-white">
                                {stats?.Users?.count}
                            </p>
                            <p className="text-lg text-gray-400 group-hover:text-white">
                                Users
                            </p>
                        </div>
                    </div>
                    <div className="flex  flex-row-reverse group col-span-12 lg:col-span-3 bg-white shadow-md  items-center px-5 rounded-lg  h-20 hover:bg-indigo-600  transition-all ">
                        <div className="w-full h-full  flex justify-end bg-inherit  ">
                            <svg
                                className="w-10 bg-inherit stroke-gray-400 group-hover:stroke-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                ></path>
                            </svg>
                        </div>
                        <div className="w-[60%] h-full flex flex-col items-baseline justify-center ">
                            <p className="text-2xl text-indigo-600 group-hover:text-white">
                                {stats?.Documents?.count}
                            </p>
                            <p className="text-lg text-gray-400 group-hover:text-white">
                                Documents
                            </p>
                        </div>
                    </div>
                    <div className="flex  flex-row-reverse group col-span-12 lg:col-span-3 bg-white shadow-md  items-center px-5 rounded-lg  h-20 hover:bg-indigo-600  transition-all ">
                        <div className="w-full h-full  flex justify-end bg-inherit ">
                            <svg
                                className="w-10 bg-inherit stroke-gray-400 group-hover:stroke-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
                                ></path>
                            </svg>
                        </div>
                        <div className="w-[60%] h-full  flex flex-col items-baseline justify-center">
                            <p className="text-2xl text-indigo-600 group-hover:text-white">
                                22
                            </p>
                            <p className="text-lg text-gray-400 group-hover:text-white">
                                Downloads
                            </p>
                        </div>
                    </div>

                    <div className=" h-fit  col-span-12  lg:col-span-7 rounded-lg space-y-3 divide-y-0 divide-indigo-500 ">
                        <div className="bg-white rounded-lg shadow-md p-2 ">
                            <p className="px-3 text-xl">Users</p>
                            <hr class="h-px mx-3 mb-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                            <div className="flex justify-evenly ">
                                {/* <Doughnut chartData={userData} /> */}
                                <Doughnut chartData={userData} />
                                <Doughnut chartData={userData2} />
                            </div>
                        </div>

                        <div className="flex justify-evenly rounded-lg divide-x-0 divide-indigo-500  gap-3">
                            <div className="bg-white rounded-lg shadow-md p-2 w-full     ">
                                <p className="px-3 text-xl">Documents</p>
                                <hr class="h-px mx-3 mb-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                                <Doughnut
                                    chartData={documentData}
                                    className={" rounded-lg "}
                                />
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-2 w-full     ">
                                <p className="px-3 text-xl">Universities</p>
                                <hr class="h-px mx-3 mb-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                                <Doughnut
                                    chartData={universityData}
                                    className={" rounded-lg "}
                                />
                            </div>
                        </div>

                        {/* <Doughnut chartData={universityData} /> */}
                    </div>
                    <div className="col-span-12  flex flex-col lg:col-span-5 rounded-lg gap-4  ">
                        <div className="flex gap-2">
                            <div className="flex justify-between px-7 py-3 h-20 bg-white shadow-md   rounded-lg w-full">
                                <div>
                                    <p className="text-lg">Fields</p>
                                    <p className="text-2xl text-indigo-600">
                                        +{stats?.Fields?.count}
                                    </p>
                                </div>

                                {/* <p>icon</p> */}
                            </div>

                            <div className="flex justify-between px-7 py-3 h-20 bg-white shadow-md  rounded-lg w-full">
                                <div className="">
                                    <p className="text-lg">Branches</p>
                                    <p className="text-2xl text-indigo-600">
                                        +{stats?.Branches?.count}
                                    </p>
                                </div>
                                {/* <p>icon</p> */}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <div className="flex justify-between px-7 py-3 h-20 bg-white shadow-md   rounded-lg w-full">
                                <div>
                                    <p className="text-lg">Specialties</p>
                                    <p className="text-2xl text-indigo-600">
                                        +{stats?.Specialties?.count}
                                    </p>
                                </div>
                                {/* <p>icon</p> */}
                            </div>
                            <div className="flex justify-between px-7 py-3 h-20 bg-white shadow-md   rounded-lg w-full">
                                <div>
                                    <p className="text-lg">Courses</p>
                                    <p className="text-2xl text-indigo-600">
                                        +{stats?.Courses?.count}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="grid lg:grid-cols-12 gap-5  ">
                    <div className="flex  col-span-12 lg:col-span-3 bg-white shadow-md  items-center p-5 rounded-lg py-0  h-36">
                        <div className="w-[60%]">
                            <p className="flex items-center gap-2">
                                Universities
                                <lord-icon
                                    src="/universityIcon.json"
                                    trigger="hover"
                                    target=".group"
                                    // colors="black"
                                    colors="primary:#4F46E5"
                                    state="hover"
                                    style={{ width: "20%" }}
                                ></lord-icon>
                            </p>
                            <p>
                                <span className="font-semibold text-xl">
                                    +{stats?.Universities?.count}
                                </span>
                            </p>
                        </div>
                        <div className=" w-[40%] self-center ">
                            <Doughnut chartData={universityData} />
                        </div>
                    </div>

                    <div className="flex   col-span-12 lg:col-span-3 bg-white shadow-md  items-center p-5 rounded-lg py-0  h-36">
                        <div className="w-[60%]">
                            <p className="flex group items-center gap-2">
                                Users
                                <lord-icon
                                    src="/users.json"
                                    trigger="morph"
                                    target=".group"
                                    // colors="black"
                                    colors="primary:#4F46E5"
                                    state="morph-group"
                                    style={{
                                        width: "20%",
                                        strokeWidth: "20px",
                                    }}
                                ></lord-icon>
                            </p>
                            <p>
                                <span className="font-semibold text-xl">
                                    +{stats?.Users.count}
                                </span>
                            </p>
                        </div>
                        <div className=" w-[40%] self-center ">
                            <Doughnut chartData={userData} cutout="20%" />
                        </div>
                    </div>
                    <div className="flex col-span-12 lg:col-span-3  bg-white shadow-md  items-center p-5 rounded-lg py-0  h-36">
                        <div className="w-[60%]">
                            <p className="flex items-center gap-2">
                                Documents
                                <lord-icon
                                    src="/universityIcon.json"
                                    trigger="hover"
                                    target=".group"
                                    // colors="black"
                                    colors="primary:#4F46E5"
                                    state="hover"
                                    style={{ width: "20%" }}
                                ></lord-icon>
                            </p>
                            <p>
                                <span className="font-semibold text-xl">
                                    +{stats?.Documents.count}
                                </span>
                            </p>
                        </div>
                        <div className=" w-[40%] self-center ">
                            <Doughnut chartData={documentData} />
                        </div>
                    </div>
                    <div className="flex col-span-12 lg:col-span-3  bg-white shadow-md items-center p-5 rounded-lg py-0  h-36">
                        <div className="w-[60%]">
                            <p className="flex items-center gap-2">
                                Downloads
                                <lord-icon
                                    src="/universityIcon.json"
                                    trigger="hover"
                                    target=".group"
                                    // colors="black"
                                    colors="primary:#4F46E5"
                                    state="hover"
                                    style={{ width: "20%" }}
                                ></lord-icon>
                            </p>
                            <p>
                                <span className="font-semibold text-xl">
                                    +132
                                </span>
                            </p>
                        </div>
                        <div className=" w-[40%] self-center ">
                            
                        </div>
                    </div>

                    <div className=" h-fit bg-white col-span-12  lg:col-span-7 rounded-lg ">
                        <Bar chartData={data2} />
                    </div>
                    <div className="   col-span-12  lg:col-span-5 rounded-lg space-y-5 flex flex-col justify-between">
                        <div className="flex justify-between px-7 py-3 bg-white shadow-md   rounded-lg">
                            <div>
                                <p className="text-2xl">Fields</p>
                                <p className="text-2xl font-bold">
                                    +{stats?.Fields?.count}
                                </p>
                            </div>
                            <p>icon</p>
                        </div>

                        <div className="flex justify-between px-7 py-3 bg-white shadow-md  rounded-lg">
                            <div>
                                <p className="text-2xl">Branches</p>
                                <p className="text-2xl font-bold">
                                    +{stats?.Branches?.count}
                                </p>
                            </div>
                            <p>icon</p>
                        </div>
                        <div className="flex justify-between px-7 py-3 bg-white shadow-md   rounded-lg">
                            <div>
                                <p className="text-2xl">Specialties</p>
                                <p className="text-2xl font-bold">
                                    +{stats?.Specialties?.count}
                                </p>
                            </div>
                            <p>icon</p>
                        </div>
                        <div className="flex justify-between pl-10 py-3 bg-white shadow-md   rounded-lg">
                            <div>
                                <p className="text-2xl">Courses</p>
                                <p className="text-2xl font-bold">
                                    +{stats?.Courses?.count}
                                </p>
                            </div>
                        </div>
                      
                    </div>
                </div>  */}
            </section>
        </>
    );
};

export default Statistics;

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

const states_colors = {
    user: {
        active: "#fb923c",
        disabled: "#e2e8f0",
    },
    uni: {
        active: "#475BE8",
        // pending: "#e2e8f0",
        suspended: "#e2e8f0",
    },
};
const document_types_colors = {
    Tp: "#475BE8",
    Td: "#475BE8",
    Exam: "#475BE8",
    PhdThesis: "#CFC8FF",
    FinalThesis: "#CFC8FF",
};

const Statistics = () => {
    useEffect(() => {
        defineElement(lottie.loadAnimation);
    }, []);


    const axiosPrivate = useAxiosPrivate();

    const {
        data: stats,
        isError,
        error,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery(["stats"], async () => {
        const response = await axiosPrivate.get(
            `/statistics`
        );
        // console.log(response.data)
        return response.data;
    });

    // const {auth} = useAuth();

    const universityData = {
        labels: stats?.Universities.states.map((item) => item._id),

        datasets: [
            {
                //   data: [ stats?.Universities?.states[0].count , stats?.Universities.states[1].count],
                data: stats?.Universities.states.map((item) => item.count),
                backgroundColor: stats?.Universities.states.map(
                    (item) => states_colors.uni[item._id]
                ),
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
                label: "",
                // data: stats?.Users.roles.map((item) => item.count),
                data: [20].concat(
                    stats?.Users.roles
                        .filter((item) => roles[item._id] !== "Super Admin")
                        .map((item) => item.count)
                ),
                backgroundColor: ["#FD8539", "#2ED480", "#FE6D8E"],
                // borderColor: ["#818cf8", "#c7d2fe", "#4f46e5"],
                // borderWidth: 1,
            },
        ],
    };

    const dummyData_1 = {
        labels: ["", ""],

        datasets: [
            {
                // data: stats?.Users.roles.map((item) => item.count),
                data: [6, 2],
                backgroundColor: ["#22c55e", "#e2e8f0"],
            },
        ],
    };
    const dummyData_2 = {
        labels: ["", ""],

        datasets: [
            {
                // data: stats?.Users.roles.map((item) => item.count),
                data: [6, 2],
                backgroundColor: ["#ec4899", "#e2e8f0"],
            },
        ],
    };
    const userData2 = {
        labels: stats?.Users.states.map((item) => item._id),
        datasets: [
            {
                data: stats?.Users.states.map((item) => item.count),
                backgroundColor: stats?.Users.states.map(
                    (item) => states_colors.user[item._id]
                ),
                // borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                // borderWidth: 1,
            },
        ],
    };

    const documentData = {
        labels: stats?.Documents.types.map((item) => item._id),

        datasets: [
            {
                label: "Teacher Documents",
                data: stats?.Documents.types.map((item) => item.count),
                backgroundColor: stats?.Documents.types.map(
                    (item) => document_types_colors[item._id]
                ),
            },
            // {
            //     label:"Students Documents",
            //     data: stats?.Documents.types.filter((item)=> ['FinalThesis','PhdThesis'].includes(item._id)).map((item) => item.count),
            //     backgroundColor: "#475BE8",

            // },
        ],
    };

    return (
        <>
            <section className=" ">
                {/* search input */}

                <h2 className="text-4xl my-20 mb-5">Dashboard</h2>

                {/* statistics display */}
                <div className="grid lg:grid-cols-12 gap-5   ">
                    {/* first row */}
                    <div className="flex h-fit justify-between group col-span-12 lg:col-span-3 bg-white shadow-md  hover:shadow-xl items-center p-4 rounded-lg   hover:bg-indigo-600  border-0 border-indigo-600 hover:border-white transition-all ">
                        <div className="w-[60%] h-full flex flex-col items-baseline  ">
                            <p className="text-md text-gray-500 group-hover:text-white">
                                Universities
                            </p>
                            <p className=" text-4xl font-semibold  text-indigo-700 group-hover:text-white">
                                {stats?.Universities?.count}
                            </p>
                        </div>
                        <div className=" h-20  ">
                            <Doughnut chartData={universityData} cutout="50%" />
                        </div>
                    </div>
                    <div className="flex h-fit justify-between group col-span-12 lg:col-span-3 bg-white shadow-md  hover:shadow-xl items-center p-4 rounded-lg   hover:bg-indigo-600  border-0 border-indigo-600 hover:border-white transition-all ">
                        <div className="w-[60%] h-full flex flex-col items-baseline  ">
                            <p className="text-md text-gray-500 group-hover:text-white">
                                Users
                            </p>
                            <p className=" text-4xl font-semibold  text-indigo-700 group-hover:text-white">
                                {stats?.Users?.count}
                            </p>
                        </div>
                        <div className=" h-20  ">
                            <Doughnut chartData={userData2} cutout="50%" />
                        </div>
                    </div>
                    <div className="flex h-fit justify-between group col-span-12 lg:col-span-3 bg-white shadow-md  hover:shadow-xl items-center p-4 rounded-lg   hover:bg-indigo-600  border-0 border-indigo-600 hover:border-white transition-all ">
                        <div className="w-[60%] h-full flex flex-col items-baseline  ">
                            <p className="text-md text-gray-500 group-hover:text-white">
                                Documents
                            </p>
                            <p className=" text-4xl font-semibold  text-indigo-700 group-hover:text-white">
                                {stats?.Documents?.count}
                            </p>
                        </div>
                        <div className=" h-20  ">
                            <Doughnut
                                chartData={dummyData_1}
                                cutout="50%"
                                tooltip={false}
                            />
                        </div>
                    </div>
                    <div className="flex h-fit justify-between group col-span-12 lg:col-span-3 bg-white shadow-md  hover:shadow-xl items-center p-4 rounded-lg   hover:bg-indigo-600  border-0 border-indigo-600 hover:border-white transition-all ">
                        <div className="w-[60%] h-full flex flex-col items-baseline  ">
                            <p className="text-md text-gray-500 group-hover:text-white">
                                Downloads
                            </p>
                            <p className=" text-4xl font-semibold  text-indigo-700 group-hover:text-white">
                                {stats?.Documents?.downloads[0]?.totalDownloads || 0}
                            </p>
                        </div>
                        <div className=" h-20  ">
                            <Doughnut
                                chartData={dummyData_2}
                                cutout="50%"
                                tooltip={false}
                            />
                        </div>
                    </div>

                    {/* second row */}
                    <div className="col-span-12  lg:col-span-7 space-y-3  bg-white rounded-lg shadow-md px-3 py-5 border-0 border-indigo-600 ">
                        <div className="flex justify-between items-center">
                            <p className="px-3 text-xl">Document Variations</p>

                            <div className=" flex gap-5 ">
                                <p className="text-sm flex  items-center">
                                    <span className="inline-block w-4 h-4 mr-2 bg-[#475BE8] rounded-full"></span>
                                    By Teachers
                                </p>
                                <p className="text-sm flex  items-center">
                                    <span className="inline-block w-4 h-4 mr-2 bg-[#CFC8FF] rounded-full"></span>
                                    By Librarian
                                </p>
                            </div>
                        </div>

                        <hr className="h-px mx-3 mb-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <div className="flex justify-evenly h-80">
                            <Bar chartData={documentData} />
                        </div>
                    </div>

                    <div className="col-span-12  flex flex-col lg:col-span-5 rounded-lg gap-4  ">
                        <div className="bg-white rounded-lg shadow-md p-3 h-full">
                            <p className="   text-2xl">new Submissions</p>
                            <p className="text-4xl font-semibold  text-indigo-700 group-hover:text-white">
                                {" "}
                                {stats?.Universities?.states?.find(
                                    (item) => item._id === "pending"
                                )?.count || 0}
                            </p>
                        </div>
                        <div className="flex gap-2 ">
                            <div className="flex justify-between group px-5 py-3 h-20 bg-white shadow-md hover:shadow-xl hover:bg-indigo-600 border-0 border-indigo-600 hover:border-white transition-all  rounded-lg w-full">
                                <div>
                                    <p className="text-lg group-hover:text-white transition-all">
                                        Fields
                                    </p>
                                    <p className="text-xl font-semibold text-indigo-500 group-hover:text-white transition-all">
                                        +{stats?.Fields?.count}
                                    </p>
                                </div>

                                {/* <p>icon</p> */}
                            </div>

                            <div className="flex justify-between group px-5 py-3 h-20 bg-white shadow-md hover:shadow-xl hover:bg-indigo-600 border-0  border-indigo-600 hover:border-white transition-all rounded-lg w-full">
                                <div className="">
                                    <p className="text-lg group-hover:text-white transition-all">
                                        Branches
                                    </p>
                                    <p className="text-xl font-semibold text-indigo-500 group-hover:text-white transition-all">
                                        +{stats?.Branches?.count}
                                    </p>
                                </div>
                                {/* <p>icon</p> */}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <div className="flex justify-between px-5 py-3 h-20 bg-white shadow-md hover:shadow-xl group hover:bg-indigo-600 border-0 border-indigo-600 hover:border-white transition-all rounded-lg w-full">
                                <div>
                                    <p className="text-lg group-hover:text-white transition-all">
                                        Specialties
                                    </p>
                                    <p className="text-xl font-bold text-indigo-500 group-hover:text-white transition-all">
                                        +{stats?.Specialties?.count}
                                    </p>
                                </div>
                                {/* <p>icon</p> */}
                            </div>
                            <div className="flex justify-between px-5 py-3 h-20 bg-white shadow-md  hover:shadow-xl  group hover:bg-indigo-600 transition-all border-0 border-indigo-600 hover:border-white rounded-lg w-full">
                                <div>
                                    <p className="text-lg group-hover:text-white transition-all">
                                        Courses
                                    </p>
                                    <p className="text-xl font-semibold text-indigo-500  group-hover:text-white transition-all">
                                        +{stats?.Courses?.count}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Statistics;

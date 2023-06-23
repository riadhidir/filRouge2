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
        pending: "#e2e8f0",
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

    const [menuItems, setMenuItems] = useState(null);
    //  const menuItems = [
    //      "Products",
    //      "Documentation",
    //      "Features",
    //      "Partners",
    //      "Industry",
    //      "Feedback",
    //      "Tech stack",
    //  ];

    const [selectedItem, setSelectedItem] = useState({
        item: "",
        idx: null,
    });

    const [state, setState] = useState(false);
    const [searchFieldVal, setSearchFieldVal] = useState("");

    const listboxRef = useRef();

    const handleSearch = (e) => {
        const menuEls = document.querySelectorAll(".menu-el-js");
        const searchVal = e.target.value.toLocaleLowerCase();
        const alrtEl = document.getElementById("li-alert");
        setSearchFieldVal(e.target.value);
        const handleAlert = () => {
            if (listboxRef.current && listboxRef.current.offsetHeight < 5)
                alrtEl.classList.remove("hidden");
            else alrtEl.classList.add("hidden");
        };
        handleAlert();
        setTimeout(() => handleAlert(), 100);

        menuEls.forEach((el, idx) => {
            el.classList.remove("hidden");
            if (!menuItems[idx].toLocaleLowerCase().includes(searchVal)) {
                el.classList.add("hidden");
            }
        });
    };

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".label-button")) setState(false);
        };
    }, []);

    const [university, setUniversity] = useState("");
    const axiosPrivate = useAxiosPrivate();

    const {
        data: stats,
        isError,
        error,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery(["stats"], async () => {
        //  if (userUniversity == undefined) {
        //      return <></>;
        //  }
        // console.log("refetch");
        const response = await axiosPrivate.get(
            `/statistics/${selectedItem.item}`
        );
        //  setPages(response.data.totalPages);
        setMenuItems(response.data.Universities.data);
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

                <div className="flex justify-between items-center pb-5">
<p className="text-4xl ">Dashboard</p>

<div className="relative max-w-xs rounded-lg   text-base bg-white border-0 border-indigo-600 ">
                    <div className="label-button flex items-center gap-1 px-2 border rounded-lg shadow-sm">
                        <svg
                        
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-indigo-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder="Type to search"
                            className="w-full px-2 py-2 text-gray-500 bg-transparent rounded-md outline-none"
                            value={searchFieldVal}
                            onChange={handleSearch}
                            onFocus={() => setState(true)}
                        />
                        {searchFieldVal ? (
                            <button
                                onClick={() => {
                                    setSearchFieldVal("");
                                    setSelectedItem({ item: "", idx: null });
                                    setState(false);
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5 text-indigo-400"
                                >
                                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                </svg>
                            </button>
                        ) : (
                            <button onClick={() => setState(!state)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5 text-indigo-400"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>

                    {state ? (
                        <div className="relative w-full">
                            <ul
                                ref={listboxRef}
                                className="absolute w-full mt-3 overflow-y-auto bg-white border rounded-md shadow-sm max-h-64 z-50"
                                role="listbox"
                            >
                                <li
                                    id="li-alert"
                                    className="hidden px-3 py-2 text-center text-gray-600"
                                >
                                    Not results available
                                </li>
                                {menuItems?.map((el, idx) => (
                                    <li
                                        key={idx}
                                        onClick={() => {
                                            setSelectedItem({
                                                item: el._id,
                                                idx,
                                            });
                                            setSearchFieldVal(el.name);
                                        }}
                                        role="option"
                                        aria-selected={
                                            selectedItem.idx == idx
                                                ? true
                                                : false
                                        }
                                        className={`${
                                            selectedItem.idx == idx
                                                ? "text-black bg-indigo-50"
                                                : ""
                                        } menu-el-js flex items-center justify-between px-3 py-2 cursor-default duration-150 text-gray-500 hover:text-black hover:bg-indigo-50`}
                                    >
                                        {el?.name}
                                        {selectedItem.idx == idx ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-5 h-5 text-black"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        ) : (
                                            ""
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        ""
                    )}


                </div>


                    
                </div>
                


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
                                {stats?.Universities?.count}
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
                                    <span class="inline-block w-4 h-4 mr-2 bg-[#475BE8] rounded-full"></span>
                                    By Teachers
                                </p>
                                <p className="text-sm flex  items-center">
                                    <span class="inline-block w-4 h-4 mr-2 bg-[#CFC8FF] rounded-full"></span>
                                    By Students
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
                            <div className="flex justify-between group px-7 py-3 h-20 bg-white shadow-md hover:shadow-xl hover:bg-indigo-600 border-0 border-indigo-600 hover:border-white transition-all  rounded-lg w-full">
                                <div>
                                    <p className="text-lg group-hover:text-white transition-all">
                                        Fields
                                    </p>
                                    <p className="text-2xl text-black group-hover:text-white transition-all">
                                        +{stats?.Fields?.count}
                                    </p>
                                </div>

                                {/* <p>icon</p> */}
                            </div>

                            <div className="flex justify-between group px-7 py-3 h-20 bg-white shadow-md hover:shadow-xl hover:bg-indigo-600 border-0  border-indigo-600 hover:border-white transition-all rounded-lg w-full">
                                <div className="">
                                    <p className="text-lg group-hover:text-white transition-all">
                                        Branches
                                    </p>
                                    <p className="text-2xl text-black group-hover:text-white transition-all">
                                        +{stats?.Branches?.count}
                                    </p>
                                </div>
                                {/* <p>icon</p> */}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <div className="flex justify-between px-7 py-3 h-20 bg-white shadow-md hover:shadow-xl group hover:bg-indigo-600 border-0 border-indigo-600 hover:border-white transition-all rounded-lg w-full">
                                <div>
                                    <p className="text-lg group-hover:text-white transition-all">
                                        Specialties
                                    </p>
                                    <p className="text-2xl text-black group-hover:text-white transition-all">
                                        +{stats?.Specialties?.count}
                                    </p>
                                </div>
                                {/* <p>icon</p> */}
                            </div>
                            <div className="flex justify-between px-7 py-3 h-20 bg-white shadow-md  hover:shadow-xl  group hover:bg-indigo-600 transition-all border-0 border-indigo-600 hover:border-white rounded-lg w-full">
                                <div>
                                    <p className="text-lg group-hover:text-white transition-all">
                                        Courses
                                    </p>
                                    <p className="text-2xl text-black  group-hover:text-white transition-all">
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

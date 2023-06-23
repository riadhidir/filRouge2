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
                data:[20].concat( stats?.Users.roles
                    .filter((item) => roles[item._id] !== "Super Admin")
                    .map((item) => item.count)),
                backgroundColor: ["#FD8539", "#2ED480", "#FE6D8E"],
                // borderColor: ["#818cf8", "#c7d2fe", "#4f46e5"],
                // borderWidth: 1,
                barPercentage: 0.5,
        barThickness: 30,
        maxBarThickness: 30,
        minBarLength: 2,
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
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
            },
        ],
    };


    return (
        <>
            <section className=" ">
                {/* search input */}
                <div className="relative max-w-xs rounded-lg mx-auto m-5 text-base bg-white border-2 border-indigo-600 ">
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
                {/* statistics display */}
                <div className="grid lg:grid-cols-12 gap-5   ">
                    <div className="flex  flex-row-reverse group col-span-12 lg:col-span-3 bg-white shadow-md  hover:shadow-xl items-center px-5 rounded-lg  h-20 hover:bg-indigo-600  border-2 border-indigo-600 hover:border-white transition-all ">
                        <div className="w-full h-full  flex justify-end bg-inherit shadow-inner  ">
                            <svg
                                fill="none"
                                className="w-10 bg-inherit stroke-indigo-600 group-hover:stroke-white"
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
                            <p className=" text-2xl text-black group-hover:text-white">
                                {stats?.Universities?.count}
                            </p>
                            <p className="text-lg text-gray-400 group-hover:text-white">
                                Universities
                            </p>
                        </div>
                    </div>
                    <div className="flex  flex-row-reverse group col-span-12 lg:col-span-3 bg-white shadow-md hover:shadow-xl items-center px-5 rounded-lg  h-20 hover:bg-indigo-600 border-2 border-indigo-600 hover:border-white transition-all ">
                        <div className="w-full h-full  flex justify-end bg-inherit  ">
                            <svg
                                className="w-10 bg-inherit stroke-indigo-600 group-hover:stroke-white"
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
                            <p className="text-2xl text-black group-hover:text-white">
                                {stats?.Users?.count}
                            </p>
                            <p className="text-lg text-gray-400 group-hover:text-white">
                                Users
                            </p>
                        </div>
                    </div>
                    <div className="flex  flex-row-reverse group col-span-12 lg:col-span-3 bg-white shadow-md hover:shadow-xl items-center px-5 rounded-lg  h-20 hover:bg-indigo-600 border-2 border-indigo-600 hover:border-white transition-all ">
                        <div className="w-full h-full  flex justify-end bg-inherit  ">
                            <svg
                                className="w-10 bg-inherit stroke-indigo-600 group-hover:stroke-white"
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
                            <p className="text-2xl text-black group-hover:text-white">
                                {stats?.Documents?.count}
                            </p>
                            <p className="text-lg text-gray-400 group-hover:text-white">
                                Documents
                            </p>
                        </div>
                    </div>
                    <div className="flex  flex-row-reverse group col-span-12 lg:col-span-3 bg-white shadow-md hover:shadow-xl items-center px-5 rounded-lg  h-20 hover:bg-indigo-600 border-2 border-indigo-600 hover:border-white transition-all ">
                        <div className="w-full h-full  flex justify-end bg-inherit ">
                            <svg
                                className="w-10 bg-inherit stroke-indigo-600 group-hover:stroke-white"
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
                            <p className="text-2xl text-black group-hover:text-white">
                                22
                            </p>
                            <p className="text-lg text-gray-400 group-hover:text-white">
                                Downloads
                            </p>
                        </div>
                    </div>

                    <div className="   col-span-12  lg:col-span-7 rounded-lg space-y-3  ">
                        <div className=" bg-white rounded-lg shadow-md p-2 border-2 border-indigo-600  ">
                            <p className="px-3 text-xl">Users</p>
                            <hr class="h-px mx-3 mb-2 bg-gray-200 border-2 dark:bg-gray-700"></hr>
                            <div className="flex justify-evenly h-96">
                                {/* <Doughnut chartData={userData} /> */}
                                <Bar chartData={userData} />
                                <Doughnut chartData={userData2} cutout="0%" />
                            </div>
                        </div>

                        <div className="flex justify-evenly rounded-lg  gap-3">

                            <div className="h-fit bg-white rounded-lg shadow-md p-2 w-full  border-2 border-indigo-600    ">

                                <p className="px-3 text-xl">Documents</p>
                                <hr class="h-px mx-3 mb-2 bg-gray-200 border-2 dark:bg-gray-700"></hr>
                                <Bar
                                    chartData={documentData}
                                    // className={" rounded-lg "}
                                />
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-2 w-full   border-2  border-indigo-600   ">
                                <p className="px-3 text-xl">Universities</p>
                                <hr class="h-px mx-3 mb-2 bg-gray-200 border-2 dark:bg-gray-700"></hr>
                                <Doughnut
                                    chartData={universityData}
                                    className={" rounded-lg "}
                                    cutout="0%"
                                />
                            </div>
                            
                        </div>

                        {/* <Doughnut chartData={universityData} /> */}
                    </div>




                    <div className="col-span-12  flex flex-col lg:col-span-5 rounded-lg gap-4  ">
                        <div className="flex gap-2 ">
                            <div className="flex justify-between group px-7 py-3 h-20 bg-white shadow-md hover:shadow-xl hover:bg-indigo-600 border-2 border-indigo-600 hover:border-white transition-all  rounded-lg w-full">
                                <div>
                                    <p className="text-lg group-hover:text-white transition-all">Fields</p>
                                    <p className="text-2xl text-black group-hover:text-white transition-all">
                                        +{stats?.Fields?.count}
                                    </p>
                                </div>

                                {/* <p>icon</p> */}
                            </div>

                            <div className="flex justify-between group px-7 py-3 h-20 bg-white shadow-md hover:shadow-xl hover:bg-indigo-600 border-2  border-indigo-600 hover:border-white transition-all rounded-lg w-full">
                                <div className="">
                                    <p className="text-lg group-hover:text-white transition-all">Branches</p>
                                    <p className="text-2xl text-black group-hover:text-white transition-all">
                                        +{stats?.Branches?.count}
                                    </p>
                                </div>
                                {/* <p>icon</p> */}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <div className="flex justify-between px-7 py-3 h-20 bg-white shadow-md hover:shadow-xl group hover:bg-indigo-600 border-2 border-indigo-600 hover:border-white transition-all rounded-lg w-full">
                                <div>
                                    <p className="text-lg group-hover:text-white transition-all">Specialties</p>
                                    <p className="text-2xl text-black group-hover:text-white transition-all">
                                        +{stats?.Specialties?.count}
                                    </p>
                                </div>
                                {/* <p>icon</p> */}
                            </div>
                            <div className="flex justify-between px-7 py-3 h-20 bg-white shadow-md  hover:shadow-xl  group hover:bg-indigo-600 transition-all border-2 border-indigo-600 hover:border-white rounded-lg w-full">
                                <div>
                                    <p className="text-lg group-hover:text-white transition-all">Courses</p>
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

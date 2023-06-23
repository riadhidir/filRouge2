import { Link, NavLink, Outlet } from "react-router-dom";
import jwt_decode from 'jwt-decode';

// import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
// import { faChartP } from "@fortawesome/free-regular-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLogout from "../hooks/useLogout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBuildingColumns, faUser, faPieChart } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth";
import { ToastContainer } from "react-toastify";
// import lottie from 'lottie-web';
// import { defineElement } from 'lord-icon-element';
// // define "lord-icon" custom element with default properties
// defineElement(lottie.loadAnimation);

const navLinks = {
    e114: [
        {
            link: "",
            icon:<FontAwesomeIcon icon={faPieChart} />,
            
            text: "Dashboard",
        },
        {
            link: "/universities",
            icon: <FontAwesomeIcon icon={faBuildingColumns} />,
            text: "Universities",
        },
    ],
    dcac: [
        {
            link: "",
            icon:<FontAwesomeIcon icon={faPieChart} />,
            text: "Dashboard",
        },
        {
            link: "/configuration",
            icon: <FontAwesomeIcon icon={faBuildingColumns} />,
            text: "Configuration",
        },
        {
            link: "/teachers",
            icon: <FontAwesomeIcon icon={faUser} />,
            text: "Teachers",
        },
        {
            link: "/librarians",
            icon: <FontAwesomeIcon icon={faUser} />,
            text: "Librarians",
        },
       
    ],
    //teacher
    '68d0' : [{
        
            link: "/teacher",
            icon: <FontAwesomeIcon icon={faBuildingColumns} />,
            text: "My Documents",
        

    }],
    //Librarian
    c128: [
        {
            link: "/librarian",
            icon: <FontAwesomeIcon icon={faBuildingColumns} />,
            text: "My Documents",
        },
    ]


 
   
};
const Dashboard = () => {
    const logout = useLogout();
    const axiosPrivate = useAxiosPrivate();
    
    const {auth} = useAuth();
    const decode =   jwt_decode(auth.accessToken);
    const role = decode.UserInfo.role ;

    const [showMenu, setShowMenu] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const {
        data,
        isError,
        error,
        isLoading,
        refetch,
    } = useQuery([], async () => {
        // console.log('here');
        const response = await axiosPrivate.get(`/users/profile/${decode.UserInfo.id}`);
        // console.log(response.data);

        return response.data;
    });
    // console.log(auth)
    // console.log(navLinks['e114'])

    return (
        <>
            <nav
                className={`fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
            >
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button
                                onClick={() => setShowSidebar(!showSidebar)}
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                            </button>
                            <Link
                                to="https://flowbite.com"
                                className="flex ml-2 md:mr-24"
                            >
                                <img
                                    src="https://flowbite.com/docs/images/logo.svg"
                                    className="h-8 mr-3"
                                    alt="FlowBite Logo"
                                />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                    Flowbite
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ml-3">
                                <div>
                                    <button
                                        onClick={() => setShowMenu(!showMenu)}
                                        type="button"
                                        className="flex text-sm bg-gray-800 rounded-full z-50 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                        aria-expanded="false"
                                        data-dropdown-toggle="dropdown-user"
                                    >
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                            alt="user photo"
                                        />
                                    </button>
                                </div>
                                <div
                                    className={`z-50 ${
                                        showMenu ? "absolute" : "hidden"
                                    } top-10 right-5  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
                                    id="dropdown-user"
                                >
                                    <div className="px-4 py-3" role="none">
                                        <p
                                            className="text-sm text-gray-900 dark:text-white"
                                            role="none"
                                        >
                                            {`${data?.user?.f_name} ${data?.user?.l_name}`}
                                        </p>
                                        <p
                                            className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                                            role="none"
                                        >
                                            {data?.user.email}
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <Link
                                                to="/"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem"
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem"
                                            >
                                                Settings
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem"
                                            >
                                                Earnings
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={logout}
                                                className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem"
                                            >
                                                Sign out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside
                id="logo-sidebar"
                className={`fixed ${
                    showSidebar
                        ? "fixed transition-transform "
                        : " transition-transform  -translate-x-full"
                }  top-0 left-0 z-40  w-64  h-screen pt-20   border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {navLinks[role].map((link, index) => {
                            return (
                                <li key={index}>
                                    <NavLink
                                        to={link.link}
                                        className={({ isActive, isPending }) =>
                                            isPending
                                                ? "pending"
                                                : isActive
                                                ? "flex items-center p-2  text-white  bg-indigo-600 rounded-lg dark:text-white active "
                                                : "flex items-center p-2  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }
                                    >
                                        {link.icon}

                                        <span className="ml-3">
                                            {link.text}
                                        </span>
                                        {/* <lord-icon trigger="hover" src="/icon.json"></lord-icon> */}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64 bg-gray-50">
                <div className=" border-0  border-dashed rounded-lg  dark:border-gray-700 mt-14 ">
            <ToastContainer />
                   
                    <Outlet />

                    {/* <div   className="block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600">
    <div className="p-3">
        <div className="flex items-center justify-between mb-2">
            <Link to="/">
                <img className="w-10 h-10 rounded-full" src="profile-picture-5.jpg" alt="Jese Leos"/>
            </Link>
            <div>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Follow</button>
            </div>
        </div>
        <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
            <Link to="/">Jese Leos</Link>
        </p>
        <p className="mb-3 text-sm font-normal">
            <Link to="/" className="hover:underline">@jeseleos</Link>
        </p>
        <p className="mb-4 text-sm">Open-source contributor. Building <Link to="/" className="text-blue-600 dark:text-blue-500 hover:underline">flowbite.com</Link>.</p>
        <ul className="flex text-sm">
            <li className="mr-2">
                <Link to="/" className="hover:underline">
                    <span className="font-semibold text-gray-900 dark:text-white">799</span>
                    <span>Following</span>
                </Link>
            </li>
            <li>
                <Link to="/" className="hover:underline">
                    <span className="font-semibold text-gray-900 dark:text-white">3,758</span>
                    <span>Followers</span>
                </Link>
            </li>
        </ul>
    </div>
    <div data-popper-arrow></div>
</div> */}
                </div>
            </div>
        </>
    );
};

export default Dashboard;

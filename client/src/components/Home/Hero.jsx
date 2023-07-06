import React from "react";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import Navbar_2 from "../Navbar";

const Home = () => {
    const [state, setState] = useState(false);

    // Replace # paths with your paths
    const navigation = [
        // { title: "Features", path: "#" },
        // { title: "Integrations", path: "#" },
        // { title: "Universities", path: "#" },
        // { title: "Pricing", path: "#" }
    ];

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".menu-btn")) setState(false);
        };
    }, []);

    const Brand = () => (
        <div className="flex items-center justify-between py-5 md:block">
            <Link href="/home">
                <img
                    src="/logo_3.png"
                    className="h-10 w-10"
                    // width={240}
                    // height={50}
                    alt="Float UI logo"
                />
                <p>fzef</p>
            </Link>
            <div className="md:hidden">
                <button
                    className="menu-btn text-gray-500 hover:text-gray-800"
                    onClick={() => setState(!state)}
                >
                    {state ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
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
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );

    return (
        <div className="relative">
            <div
                className="absolute inset-0 blur-xl h-[580px]"
                style={{
                    background:
                        "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
                }}
            ></div>
            <div className="relative">
                <nav className="bg-transparent dark:bg-gray-900  w-full h-fit  z-20 top-0 left-0   ">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <Link href="/home" className="flex items-center">
                            <img
                                src="logo_3.png"
                                className="h-8 mr-3"
                                alt="Flowbite Logo"
                            />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ">
                                LearnCampus
                            </span>
                        </Link>

                        <Link
                            to="/login"
                            className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                        >
                            Sign in
                        </Link>
                    </div>
                </nav>
                <section>
                    <div className="max-w-screen-xl mx-auto px-4 py-10 pb-0 gap-12 text-gray-600 overflow-hidden md:px-8 md:flex items-center">
                        <div className="flex-none space-y-5 max-w-xl">
                            <h1 className="text-4xl text-gray-800 font-extrabold sm:text-5xl">
                                {/* Build your µµµµ exactly how you want */}
                                Are you ready to make the most out of your time at college?
                            </h1>
                            <p>
                                Sed ut perspiciatis unde omnis iste natus
                                voluptatem accusantium doloremque laudantium,
                                totam rem aperiam, eaque ipsa quae.
                            </p>
                            <div className="flex items-center gap-x-3 sm:text-sm">
                                <Link
                                    to="/library"
                                    className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
                                >
                                    Get started
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </Link>
                               
                            </div>
                        </div>
                        <div className="flex-1 hidden md:block ">
                            {/* Replace with your image */}
                            <img
                                src="/Studying-bro.png"
                                className="max-w-xl relative -top-20"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;

import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone,faBook , faUser} from "@fortawesome/free-solid-svg-icons";

// import {faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons'
const UniProfile = () => {
    const { universityId } = useParams();
    const axiosPrivate = useAxiosPrivate();

    const {
        data: university,
        isLoading,
        isFetching,
    } = useQuery([universityId], async () => {
        const response = await axiosPrivate.get(
            `/universities/${universityId}`
        );

        console.log(response.data);
        return response.data;
    });
    return isLoading ? (
        <div>Loading...</div>
    ) : (
        <>
            <div className="flex gap-4 mb-4 ">
                <div className="  w-[524px] flex-grow flex flex-col p-3 lg:p-6 gap-3  bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 ">
                    <h5 className="mb-2 text-2xl  font-bold tracking-tight text-indigo-700 dark:text-white">
                        {university?.university.name}
                    </h5>
                    <div className="inline-flex gap-4">
                        <span title="Librarians" className="flex w-fit  items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200">
                        <FontAwesomeIcon icon={faUser}/>
                           
                        {university?.teachersCount || 0}
                           
                        </span>
                        <span ttile="Teachers" className="flex w-fit  items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200">
                        <FontAwesomeIcon icon={faUser}/>
                           
                        {university?.librariansCount || 0}
                            
                        </span>
                        <span title="Documents" className="flex w-fit  items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200">
                          
                            <FontAwesomeIcon icon={faBook}/>
                        {university?.documentCount || 0}
                            
                        </span>
                    </div>
                    <div className="inline-flex items-center gap-x-3 lg:hidden">
                        <img
                            src="/profile-picture-5.jpg"
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="block text-gray-700 text-md font-medium">
                            {" "}
                            {`${university?.university?.admin.f_name} ${university?.university?.admin.l_name}`}
                        </span>
                        <span className="block text-gray-700 text-xs">
                            {`${university?.university.admin.email} `}
                            <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <span className="block text-gray-700 text-xs">
                            {`${university?.university.admin.phone} `}
                            <FontAwesomeIcon icon={faPhone} />
                        </span>
                    </div>
                </div>

                <div className=" hidden lg:block  flex-1 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    {/* <h5 className="mb-2 text-2xl font-bold tracking-tight text-indigo-700 dark:text-white">{university?.university.name}</h5> */}

                    <div className="flex items-center gap-x-3">
                        <img
                            src="/profile-picture-5.jpg"
                            className="w-16 h-16 rounded-full"
                        />
                        <div>
                            <span className="block text-gray-700 text-lg font-medium">
                                {" "}
                                {`${university?.university?.admin.f_name} ${university?.university?.admin.l_name}`}
                            </span>
                            <span className="block text-gray-700 text-sm ">
                                {`${university?.university.admin.email} `}
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                            <span className="block text-gray-700 text-sm ">
                                {`${university?.university.admin.phone} `}
                                <FontAwesomeIcon icon={faPhone} />
                            </span>
                        </div>
                    </div>
                    {/* <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 w-full justify-center">
                <div class="w-full  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div class="flex items-center justify-between mb-4">
                        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                            Teachers
                        </h5>
                        <a
                            href="#"
                            class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                            View all
                        </a>
                    </div>
                    <div class="flow-root">
                        <ul
                            role="list"
                            class="divide-y divide-gray-200 dark:divide-gray-700"
                        >
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <img
                                            class="w-8 h-8 rounded-full"
                                            src="/profile-picture-5.jpg"
                                            alt="Neil image"
                                        />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Neil Sims
                                        </p>
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        $320
                                    </div>
                                </div>
                            </li>
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <img
                                            class="w-8 h-8 rounded-full"
                                            src="/profile-picture-5.jpg"
                                            alt="Bonnie image"
                                        />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Bonnie Green
                                        </p>
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        $3467
                                    </div>
                                </div>
                            </li>
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <img
                                            class="w-8 h-8 rounded-full"
                                            src="/profile-picture-5.jpg"
                                            alt="Michael image"
                                        />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Michael Gough
                                        </p>
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        $67
                                    </div>
                                </div>
                            </li>
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <img
                                            class="w-8 h-8 rounded-full"
                                            src="/profile-picture-5.jpg"
                                            alt="Lana image"
                                        />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Lana Byrd
                                        </p>
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        $367
                                    </div>
                                </div>
                            </li>
                            <li class="pt-3 pb-0 sm:pt-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <img
                                            class="w-8 h-8 rounded-full"
                                            src="/profile-picture-5.jpg"
                                            alt="Thomas image"
                                        />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Thomes Lean
                                        </p>
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        $2367
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="w-full  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div class="flex items-center justify-between mb-4">
                        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                            Librarians
                        </h5>
                        <a
                            href="#"
                            class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                            View all
                        </a>
                    </div>
                    <div class="flow-root">
                        <ul
                            role="list"
                            class="divide-y divide-gray-200 dark:divide-gray-700"
                        >
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <img
                                            class="w-8 h-8 rounded-full"
                                            src="/profile-picture-5.jpg"
                                            alt="Neil image"
                                        />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Neil Sims
                                        </p>
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        $320
                                    </div>
                                </div>
                            </li>
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <img
                                            class="w-8 h-8 rounded-full"
                                            src="/profile-picture-5.jpg"
                                            alt="Bonnie image"
                                        />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Bonnie Green
                                        </p>
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        $3467
                                    </div>
                                </div>
                            </li>
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <img
                                            class="w-8 h-8 rounded-full"
                                            src="/profile-picture-5.jpg"
                                            alt="Michael image"
                                        />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Michael Gough
                                        </p>
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        $67
                                    </div>
                                </div>
                            </li>
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <img
                                            class="w-8 h-8 rounded-full"
                                            src="/profile-picture-5.jpg"
                                            alt="Lana image"
                                        />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Lana Byrd
                                        </p>
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        $367
                                    </div>
                                </div>
                            </li>
                            <li class="pt-3 pb-0 sm:pt-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <img
                                            class="w-8 h-8 rounded-full"
                                            src="/profile-picture-5.jpg"
                                            alt="Thomas image"
                                        />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Thomes Lean
                                        </p>
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        $2367
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="w-full  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div class="flex items-center justify-between mb-4">
                        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                            Documents
                        </h5>
                        <a
                            href="#"
                            class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                            View all
                        </a>
                    </div>
                    <div class="flow-root">
                        <ul
                            role="list"
                            class="divide-y divide-gray-200 dark:divide-gray-700"
                        >
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <img
                                            class="w-8 h-8 rounded-full"
                                            src="/profile-picture-5.jpg"
                                            alt="Neil image"
                                        />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Neil Sims
                                        </p>
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        $320
                                    </div>
                                </div>
                            </li>
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <img
                                            class="w-8 h-8 rounded-full"
                                            src="/profile-picture-5.jpg"
                                            alt="Bonnie image"
                                        />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Bonnie Green
                                        </p>
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        $3467
                                    </div>
                                </div>
                            </li>
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <img
                                            class="w-8 h-8 rounded-full"
                                            src="/profile-picture-5.jpg"
                                            alt="Michael image"
                                        />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Michael Gough
                                        </p>
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        $67
                                    </div>
                                </div>
                            </li>
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <img
                                            class="w-8 h-8 rounded-full"
                                            src="/profile-picture-5.jpg"
                                            alt="Lana image"
                                        />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Lana Byrd
                                        </p>
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        $367
                                    </div>
                                </div>
                            </li>
                            <li class="pt-3 pb-0 sm:pt-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <img
                                            class="w-8 h-8 rounded-full"
                                            src="/profile-picture-5.jpg"
                                            alt="Thomas image"
                                        />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Thomes Lean
                                        </p>
                                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        $2367
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UniProfile;

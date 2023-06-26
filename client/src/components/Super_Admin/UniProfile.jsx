import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faPhone,
    faBook,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

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
                        <span
                            title="Librarians"
                            className="flex w-fit  items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                        >
                            <FontAwesomeIcon icon={faUser} />

                            {university?.teachersCount || 0}
                        </span>
                        <span
                            title="Teachers"
                            className="flex w-fit  items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                        >
                            <FontAwesomeIcon icon={faUser} />

                            {university?.librariansCount || 0}
                        </span>
                        <span
                            title="Documents"
                            className="flex w-fit  items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                        >
                            <FontAwesomeIcon icon={faBook} />
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

            <div className="grid grid-cols-1 lg:grid-cols-4   gap-4  justify-center">
                <div className="bg-white border-2 rounded-lg px-2">
                    <h3 className="text-lg">Fields</h3>
                    <p className="text-xl font-semibold text-indigo-500">
                    {university?.fieldCount || 0}

                    </p>
                </div>
                <div className="bg-white border-2 rounded-lg px-2">
                    <h3 className="text-lg">Branches</h3>
                    <p className="text-xl font-semibold text-indigo-500">
                    {university?.branchCount || 0}

                    </p>
                </div>
                <div className="bg-white border-2 rounded-lg px-2">
                    <h3 className="text-lg">Specialties</h3>
                    <p className="text-xl font-semibold text-indigo-500">
                    {university?.specialtyCount || 0}

                    </p>
                </div>
                <div className="bg-white border-2 rounded-lg px-2">
                    <h3 className="text-lg">Courses</h3>
                    <p className="text-xl font-semibold text-indigo-500">
                    {university?.courseCount || 0}
                    </p>
                </div>
            </div>
        </>
    );
};

export default UniProfile;

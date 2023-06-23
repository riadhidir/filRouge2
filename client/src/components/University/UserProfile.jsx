import React, { useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faCheck,
    faTimes,
    faArrowRightRotate,
    faPause,
    faEdit,
    faTrash,
    faFile,
} from "@fortawesome/free-solid-svg-icons";
const UserProfile = () => {
    const axiosPrivate = useAxiosPrivate();

    let params = useParams();

    const { data, isLoading, error } = useQuery([params.userID], async () => {
        const response = await axiosPrivate.get(
            `/users/profile/${params.userId}`
        );

        console.log(response.data);
        return response.data;
    });

    return isLoading ? (
        <h1>Loadinffg</h1>
    ) : (
        <section>
            <div className="p-5 mb-2 text-2xl   tracking-tight  dark:text-white rounded-lg shadow-lg">{`${data.user.f_name} ${data.user.l_name} 's profile `}</div>

            <div className="flex flex-col lg:flex-row gap-10">
                <div className="basis-1/4 bg-white  shadow">
                    <div className="border-b-2 py-5 mb-2  px-3">
                        <h1 className="text-xl">Personal Profile</h1>
                    </div>

                    <p className="px-3">
                        Lorem ipsum dolor sit amet, consectetur adipis non pro
                    </p>
                </div>

                <div className="basis-1/4 bg-white  shadow flex flex-col text-center justify-around ">
                    <FontAwesomeIcon size="2xl" icon={faFile} />
                    <p className="text-3xl">{data.docCount}</p>
                    <p className="text-2xl">Documents</p>
                </div>

                <div className="basis-1/4 bg-white  shadow">
                    <div className="border-b-2 py-5 mb-2  px-3">
                        <h1 className="text-xl">Contact Information</h1>
                    </div>
                    <div className="px-3">
                        <p>{data.user.email}</p>
                        <p>{data.user.phone}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;

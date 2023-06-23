import React, { useEffect, useRef, useState } from "react";
import Filter from "../actionButtons/Filter";
import CreationModal from "./modals/TeacherDocsCreateModal";
import UpdateModal from "./modals/TeacherDocsUpdateModal";

import { useMutation, useQuery } from "@tanstack/react-query";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import jwt_decode from "jwt-decode";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";
import ActionButtons from "./UserActionButtons";

import Pagination from "../../Pagination";

import AllDocsDeleteModal from "./modals/DeleteDocModal";
import DeleteAlldocsModal from "./modals/DeleteAllDocsModal";
import TableLoadSkelton from "../loading/TableLoadSkelton";

import useNotification from "../../../hooks/useNotification";
const type = [
    { _id: "Td", name: "travaux dirigés" },
    { _id: "Tp", name: "travaux pratiques" },
    { _id: "Exam", name: "Exames" },
];

const cycle = [
    { _id: "l1", name: "1ére licence" },
    { _id: "l2", name: "2éme licence" },
    { _id: "l3", name: "3éme licence" },
    { _id: "m1", name: "1ére master" },
    { _id: "m2", name: "2éme master" },
];

const states = {
    active: (
        <span
            className={`py-2 px-3 rounded-full font-semibold text-xs text-blue-600 bg-blue-50`}
        >
            active
        </span>
    ),

    archived: (
        <span
            className={`py-2 px-3 rounded-full font-semibold text-xs text-red-600 bg-red-50`}
        >
            archived
        </span>
    ),
};

function Teacher() {
    useEffect(() => {
        defineElement(lottie.loadAnimation);
    }, []);
    const notify = useNotification();

    const [createModal, setCreateModal] = useState(false);
    const [updateModal, setUpdateModal] = useState({
        state: false,
        id: "",
        course: "",
        type: "",
        cycle: "",
        language: "",
        description: "",
        date: "",
        answer: "",
        subject: "",
    });
    const [deleteModal, setDeleteModal] = useState({
        state: false,
        subjectRef: "",
        solutionRef: "",
    });

    const checkRef = useRef([]); //all check options
    const checkAllRef = useRef(); //the check all option
    const [checkedCount, setCheckedCount] = useState(0); // to keep track of the selected cheked values

    //filter results based on states
    const [status, setStatus] = useState(0);
    const [_cycle, set_Cycle] = useState("");
    const [_type, set_Type] = useState("");
    const [field, setField] = useState("");
    const [branch, setBranch] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [course, setCourse] = useState("");

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const userUniversity = auth?.uni;

    const decode = auth.accessToken ? jwt_decode(auth.accessToken) : undefined;

    const user = decode.UserInfo.id;
    const { data, isError, error, isLoading, refetch, isRefetching } = useQuery(
        [userUniversity, user],
        async () => {
            if (userUniversity == undefined) {
                return <></>;
            }
            // console.log("refetch");
            const response = await axiosPrivate.get(
                `/documents/myteacherDocs?cycle=${_cycle}&course=${course}&type=${_type}&page=${page}&status=${status}`
            );
            setPages(response.data.totalPages);
            // console.log(response.data);
            return response.data;
        }
    );

    const toggleStateMutation = useMutation(
        (body) => {
            console.log({ id: body.id, state: body.state });
            return axiosPrivate.patch(`/documents/teacherDocs/${body.id}`, {
                state: body.state,
            });
        },
        {
            onSuccess: () => {
                refetch();
                notify("success");
            },
            onError: (error) => {
                console.error(error.message);
                notify("error");
            },
        }
    );
    useEffect(() => {
        console.log({ checkRef });
    }, [checkedCount]);

    const handletoggler = (body) => {
        toggleStateMutation.mutate(body);
    };
    useEffect(() => {
        refetch();
    }, [_cycle, _type, course, page, status]);
    return (
        <>
            <CreationModal
                show={createModal}
                setShow={setCreateModal}
                data={{
                    field: data?.filter?.field,
                    branch: data?.filter?.branch,
                    specialty: data?.filter?.specialty,
                    course: data?.filter?.course,
                    teachers: data?.filter?.teachers,
                    type,
                    cycle,
                }}
                author={user}
            />
            <UpdateModal
                show={updateModal.state}
                setShow={setUpdateModal}
                data={{
                    field: data?.filter?.field,
                    branch: data?.filter?.branch,
                    specialty: data?.filter?.specialty,
                    course: data?.filter?.course,
                    teachers: data?.filter?.teachers,
                    type,
                    cycle,
                }}
                target={updateModal}
                author={user}
            />
            <AllDocsDeleteModal
                show={deleteModal.state}
                setShow={setDeleteModal}
                data={deleteModal}
                refetch={refetch}
            />

            <section className="bg-gray-50 dark:bg-gray-900  ">
                <div className="mx-auto max-w-screen-2xl  ">
                    <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg ">
                        <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4 ">
                            <div className="flex items-center flex-1 space-x-4">
                                <h5 className="space-x-1">
                                    <span className="  text-2xl">
                                        My Uploads
                                    </span>
                                    <span className="dark:text-white text-2xl">
                                        {data?.main?.length}
                                    </span>
                                </h5>
                            </div>
                            <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                                <button
                                    onClick={() => setCreateModal(true)}
                                    type="button"
                                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                                >
                                    <svg
                                        className="h-3.5 w-3.5 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            clipRule="evenodd"
                                            fillRule="evenodd"
                                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                        />
                                    </svg>
                                    Add new product
                                </button>
                            </div>
                        </div>
                        <hr className="h-px  bg-gray-200 border-0 dark:bg-gray-700" />

                        <div className="flex flex-col relative lg:flex-row items-center space-x-3 w-full md:w-auto px-3 py-4 justify-end ">
                            {Boolean(checkedCount) && (
                                <DeleteAlldocsModal
                                    mainData={data}
                                    refList={checkRef}
                                    checkAllRef={checkAllRef}
                                    checkRef={checkRef}
                                    checkedCount={checkedCount}
                                    setCheckedCount={setCheckedCount}
                                    refetch={refetch}
                                />
                            )}

                            <div className=" flex flex-col lg:flex-row gap-5 w-full lg:w-3/4 ">
                                <Filter
                                    title="Cycle"
                                    action={set_Cycle}
                                    options={cycle}
                                />
                                <Filter
                                    title="Type"
                                    action={set_Type}
                                    options={type}
                                />

                                <Filter
                                    title="Field"
                                    action={setField}
                                    options={data?.filter?.field}
                                />
                                <Filter
                                    title="Branch"
                                    action={setBranch}
                                    options={data?.filter?.branch}
                                    indexData={{ name: "field", id: field }}
                                />
                                <Filter
                                    title="Specialty"
                                    action={setSpecialty}
                                    options={data?.filter?.specialty}
                                    indexData={{ name: "branch", id: branch }}
                                />
                                <Filter
                                    title="Course"
                                    action={setCourse}
                                    options={data?.filter?.course}
                                    indexData={{
                                        name: "specialty",
                                        id: specialty,
                                    }}
                                />
                            </div>
                        </div>
                        <hr className="h-px  bg-gray-200 border-0 dark:bg-gray-700" />

                        <div className="overflow-x-auto ">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="p-4">
                                            <div className="flex items-center">
                                                <input
                                                    ref={checkAllRef}
                                                    onChange={() => {
                                                        if (
                                                            checkAllRef.current
                                                                .checked
                                                        ) {
                                                            setCheckedCount(
                                                                checkRef.current
                                                                    .length
                                                            );
                                                            checkRef.current.map(
                                                                (item) => {
                                                                    item.checked = true;
                                                                }
                                                            );
                                                        } else {
                                                            setCheckedCount(0);
                                                            checkRef.current.map(
                                                                (item) => {
                                                                    item.checked = false;
                                                                }
                                                            );
                                                        }
                                                    }}
                                                    id="checkbox-all"
                                                    type="checkbox"
                                                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label
                                                    htmlFor="checkbox-all"
                                                    className="sr-only"
                                                >
                                                    checkbox
                                                </label>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Category
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Uploaded
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Downloads
                                        </th>
                                        <th
                                            scope="col "
                                            className="px-4 py-4 flex    gap-2"
                                        >
                                            <button
                                                onClick={() => {
                                                    status == 0
                                                        ? setStatus(1)
                                                        : status == 1
                                                        ? setStatus(-1)
                                                        : setStatus(0);
                                                }}
                                                className="group uppercase self-start block"
                                            >
                                                Status
                                                <lord-icon
                                                    src="/outlineCompare.json"
                                                    trigger="morph"
                                                    target=".group"
                                                    // colors="black"
                                                    colors="primary:#4F46E5"
                                                    state="intro"
                                                    style={{
                                                        width: "20px",
                                                        height: "15px",
                                                        transform:
                                                            "rotate(-90deg)",
                                                    }}
                                                ></lord-icon>
                                            </button>
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading || isRefetching ? (
                                        <TableLoadSkelton />
                                    ) : (
                                        data?.main?.map((item, idx) => {
                                            return (
                                                <tr
                                                    className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    key={item?._id}
                                                >
                                                    <td className="w-4 px-4 py-3">
                                                        <div className="flex items-center">
                                                            <input
                                                                ref={(ref) =>
                                                                    (checkRef.current[
                                                                        idx
                                                                    ] = ref)
                                                                }
                                                                onChange={() => {
                                                                    if (
                                                                        checkRef
                                                                            .current[
                                                                            idx
                                                                        ]
                                                                            .checked ==
                                                                        false
                                                                    ) {
                                                                        setCheckedCount(
                                                                            checkedCount -
                                                                                1
                                                                        );
                                                                        checkAllRef.current.checked = false;
                                                                    } else {
                                                                        setCheckedCount(
                                                                            checkedCount +
                                                                                1
                                                                        );
                                                                    }
                                                                }}
                                                                value={
                                                                    item?._id
                                                                }
                                                                id="checkbox-table-search-1"
                                                                type="checkbox"
                                                                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                            />
                                                            <label
                                                                htmlFor="checkbox-table-search-1"
                                                                className="sr-only"
                                                            >
                                                                checkbox
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <th
                                                        scope="row"
                                                        className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        <img
                                                            src="/PDF_icon.svg"
                                                            alt="iMac Front Image"
                                                            className="w-auto h-8 mr-3"
                                                        />
                                                        <div>
                                                            <p>{item?.title}</p>
                                                            <p>dzdzd</p>
                                                        </div>
                                                    </th>
                                                    <td className="px-4 py-2">
                                                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                                            {item.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        <div className="flex items-center">
                                                            {item.createdAt.slice(
                                                                0,
                                                                10
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {item.downloads}
                                                    </td>
                                                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {states[item.state]}
                                                    </td>
                                                    <td className="px-4 py-2  font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                                                        <ActionButtons
                                                            data={item}
                                                            edit={
                                                                setUpdateModal
                                                            }
                                                            remove={
                                                                setDeleteModal
                                                            }
                                                            toggleState={
                                                                handletoggler
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                            {!isLoading &&
                                !isRefetching &&
                                !data?.main?.length && (
                                    <div className=" bg-gray-50 h-16 flex justify-center items-center text-gray-600 border bordert-t-black">
                                        No uploads for the moment
                                    </div>
                                )}
                        </div>

                        <Pagination
                            page={page}
                            pages={pages}
                            changePage={setPage}
                        >
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                Showing
                                <span className="font-semibold text-gray-900 dark:text-white mx-1">
                                    {data?.main?.length}
                                </span>
                                of
                                <span className="font-semibold text-gray-900 dark:text-white mx-1">
                                    {data?.count}
                                </span>
                            </span>
                        </Pagination>
                    </div>
                </div>
            </section>
        </>
    );
}

const checkedCounter = (checkList) => {
    let counter = 0;
    checkList.current.map((item) => {
        item.checked && counter++;
    });
    return counter;
};
export default Teacher;

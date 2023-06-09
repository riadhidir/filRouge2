import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import jwt_decode from "jwt-decode";
import Tabs from "./Tabs";
import useAuth from "../../hooks/useAuth";
import ActionButtons from "./actionButtons/ConfigActionButtons";
import Loader from "../Super_Admin/Loader";
import Filter from "../forms/Filter";
// import { CreateFieldModal, UpdateFieldModal } from "./modals/FieldModals";
import CreateFieldModal from "./modals/CreateFieldModal";
import UpdateFieldModal from "./modals/UpdateFieldModal";
import CreateBranchModal from "./modals/CreateBranchModal";
import UpdateBranchModal from "./modals/UpdateBranchModal";
import CreateSpecialtyModal from "./modals/CreateSpecialtyModal";
import UpdateSpecialtyModal from "./modals/UpdateSpecialtyModal";
import CreateCourseModal from "./modals/CreateCourseModal";
import UpdateCourseModal from "./modals/UpdateCourseModal";
import Lottie from "lottie-web";
import { defineElement } from "lord-icon-element";
import Pagination from "../Pagination";
import useNotification from "../../hooks/useNotification";
import DeleteModal from "./modals/DeleteModal";
import { usePageTransition } from "../../hooks/usePageTransition";
const config = {
    fields: {
        add: "Field",
    },
    branches: {
        add: "Branch",
    },
    specialties: {
        add: "Specialty",
    },
    courses: {
        add: "Course",
    },
};
const filters = {
    fields: [],
    branches: ["field"],
    specialties: ["branch"],
    courses: ["field", "branch", "specialty"],
};

const states = {
    active: (
        <span
            className={`py-2 px-3 rounded-full font-semibold text-xs text-blue-600 bg-blue-50`}
        >
            active
        </span>
    ),
    pending: (
        <span
            className={`py-2 px-3 rounded-full font-semibold text-xs text-pink-600 bg-pink-50`}
        >
            Pending
        </span>
    ),
    refused: (
        <span
            className={`py-2 px-3 rounded-full font-semibold text-xs text-orange-600 bg-orange-50`}
        >
            Archived
        </span>
    ),
    disabled: (
        <span
            className={`py-2 px-3 rounded-full font-semibold text-xs text-red-600 bg-red-50`}
        >
            Disabled
        </span>
    ),
};

const Fields = () => {
    useEffect(() => {
        defineElement(Lottie.loadAnimation);
    }, []);
    const notify = useNotification();
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    //   const animationRef = usePageTransition()
    const [state, setState] = useState(0); //query
    const [field, setField] = useState(""); //query
    const [branch, setBranch] = useState(""); //query
    const [specialty, setSpecialty] = useState(""); //query

    const [search, setSearch] = useState(""); //query

    const [page, setPage] = useState(1); //query
    const [pages, setPages] = useState(1); //query

    const [createModal, setCreateModal] = useState(false);
    const [updateModal, setUpdateModal] = useState({
        state: false,
        id: "",
        previousValue: "",
        fieldID: "",
        branchID: "",
        specialtyID: "",
        cycle: "",
    });
    const [deleteModal, setDeleteModal] = useState({
        state: false,
        selectedItem: "",
        id: "",
    });
    const tabItems = ["fields", "branches", "specialties", "courses"];
    const [selectedItem, setSelectedItem] = useState(tabItems[0]);

    useEffect(() => {
        setSearch("");
        setField("");
        setBranch("");
        setSpecialty("");
        setState(0);
        setPage(1);
    }, [selectedItem]);
    const userUniversity = auth?.uni;

    //   main data fetch query
    const { data, isError, error, isLoading, refetch, isRefetching } = useQuery(
        [selectedItem, userUniversity],
        async () => {
            if (userUniversity == undefined) {
                return <></>;
            }
            const response = await axiosPrivate.get(
                `/universities/${userUniversity}/${selectedItem}?q=${search}&state=${state}&field=${field}&branch=${branch}&specialty=${specialty}&page=${page}`
            );
            console.log(response.data);
            setPages(response.data.totalPages);
            return response.data;
        }
    );

    // state toggler query
    const toggleMutation = useMutation(
        ({ id, state }) => {
            return axiosPrivate.patch(`/${selectedItem}/${id}/state`, {
                state,
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

    const handleStateToggler = ({ id, state }) => {
        toggleMutation.mutate({ id, state });
    };
    const handleSearch = (e) => {
        e.preventDefault();
        setState(0);
        // setPage(1);
        refetch();
    };

    useEffect(() => {
        refetch();
    }, [state, field, branch, specialty, page]);

    return (
        <>
            {
                // config[selectedItem].modals[0]
                selectedItem === "fields" ? (
                    <>
                        <CreateFieldModal
                            show={createModal}
                            setShow={setCreateModal}
                            refetch={refetch}
                        />
                        <UpdateFieldModal
                            show={updateModal.state}
                            setShow={setUpdateModal}
                            data={updateModal}
                            refetch={refetch}
                        />
                    </>
                ) : selectedItem === "branches" ? (
                    <>
                        <CreateBranchModal
                            show={createModal}
                            setShow={setCreateModal}
                            refetch={refetch}
                            fields={data?.filters?.field}
                        />
                        <UpdateBranchModal
                            show={updateModal.state}
                            setShow={setUpdateModal}
                            refetch={refetch}
                            fields={data?.filters?.field}
                            data={updateModal}
                        />
                    </>
                ) : selectedItem === "specialties" ? (
                    <>
                        <CreateSpecialtyModal
                            show={createModal}
                            setShow={setCreateModal}
                            refetch={refetch}
                            fields={data?.filters?.field}
                            branches={data?.filters?.branch}
                        />
                        <UpdateSpecialtyModal
                            show={updateModal.state}
                            setShow={setUpdateModal}
                            refetch={refetch}
                            fields={data?.filters?.field}
                            branches={data?.filters?.branch}
                            data={updateModal}
                        />
                    </>
                ) : selectedItem === "courses" ? (
                    <>
                        <CreateCourseModal
                            show={createModal}
                            setShow={setCreateModal}
                            refetch={refetch}
                            fields={data?.filters?.field}
                            branches={data?.filters?.branch}
                            specialties={data?.filters?.specialty}
                        />
                        <UpdateCourseModal
                            show={updateModal.state}
                            setShow={setUpdateModal}
                            refetch={refetch}
                            fields={data?.filters?.field}
                            branches={data?.filters?.branch}
                            specialties={data?.filters?.specialty}
                            data={updateModal}
                        />
                    </>
                ) : (
                    <></>
                )
            }

            <DeleteModal
                show={deleteModal.state}
                setShow={setDeleteModal}
                data={deleteModal}
                refetch={refetch}
                // selectedItem= {selectedItem}
            />

            <section className="bg-gray-50 dark:bg-gray-900 ">
                <h2 className="text-4xl my-20 mb-5">Configuration</h2>

                <div className="mx-auto   ">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg ">
                        <Tabs
                            tabItems={tabItems}
                            selectedItem={selectedItem}
                            setSelectedItem={setSelectedItem}
                        />
                        <div className="flex flex-col  md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form onSubmit={handleSearch}>
                                    <label
                                        htmlFor="default-search"
                                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                    >
                                        Search
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg
                                                aria-hidden="true"
                                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                ></path>
                                            </svg>
                                        </div>
                                        <input
                                            type="search"
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            id="default-search"
                                            className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Search ..."
                                        />
                                        <button
                                            type="submit"
                                            className="text-white absolute right-1 bottom-[5px]  bg-indigo-700 hover:bg-indigo-800  focus:outline-none  font-medium rounded-lg text-sm px-4 py-1.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 "
                                        >
                                            Search
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button
                                    onClick={() => setCreateModal(true)}
                                    type="utton"
                                    className="flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
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
                                    Add {config[selectedItem].add}
                                </button>
                                <div className="flex items-center space-x-3 w-full md:w-auto"></div>
                            </div>
                        </div>
                        <div className="px-8 py-2 flex  gap-3 flex-col lg:flex-row lg:gap-14 justify-end">
                            {filters[selectedItem]?.map((item, idx) => {
                                return (
                                    <Filter
                                        key={idx}
                                        title={item}
                                        options={data?.filters[item]}
                                        value=""
                                        action={
                                            item === "field"
                                                ? setField
                                                : item === "branch"
                                                ? setBranch
                                                : setSpecialty
                                        }
                                    />
                                );
                            })}
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">
                                            name
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => {
                                                        state == 0
                                                            ? setState(1)
                                                            : state == 1
                                                            ? setState(-1)
                                                            : setState(0);
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
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3 text-center"
                                        >
                                            Total Courses
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr className="border-b dark:border-gray-700">
                                            <th
                                                scope="row"
                                                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                <Loader />
                                            </th>
                                            <td className="px-4 py-3">
                                                <Loader />
                                            </td>
                                            <td className="px-4 py-3">
                                                <Loader />
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="text-center space-x-7">
                                                    <button>
                                                        <Loader />
                                                    </button>
                                                    <button>
                                                        <Loader />
                                                    </button>
                                                    <button>
                                                        <Loader />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        data?.main?.map((item) => {
                                            return (
                                                <tr
                                                    className="border-b dark:border-gray-700"
                                                    key={item?._id}
                                                >
                                                    <th
                                                        scope="row"
                                                        className="px-4 py-3 text-lg font-bold text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        {item?.name}
                                                        {item?.field?.name && (
                                                            <p className="text-sm text-gray-500 font-medium">
                                                                {
                                                                    item.field
                                                                        .name
                                                                }
                                                            </p>
                                                        )}
                                                        {item?.branch?.name && (
                                                            <p className="text-sm text-gray-500">
                                                                {
                                                                    item.branch
                                                                        .name
                                                                }
                                                            </p>
                                                        )}
                                                    </th>
                                                    <td className="px-4 py-3">
                                                        {states[item?.state]}
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        {/* {item?.accounts} */}
                                                        {item?.subCount || 0}
                                                    </td>

                                                    <td className="px-4 py-3">
                                                        <div className="text-center space-x-7 flex ">
                                                            <ActionButtons
                                                                selectedItem={
                                                                    selectedItem
                                                                }
                                                                // state={
                                                                //     item?.state
                                                                // }
                                                                // id={item?._id}
                                                                data={item}
                                                                edit={
                                                                    setUpdateModal
                                                                }
                                                                remove={
                                                                    // handleDeleter
                                                                    setDeleteModal
                                                                }
                                                                toggleState={
                                                                    handleStateToggler
                                                                }
                                                            />
                                                        </div>
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
                                        No data for the moment
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
};

export default Fields;

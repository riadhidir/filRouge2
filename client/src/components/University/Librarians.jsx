import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth.jsx";
import Loader from "../Super_Admin/Loader.jsx";
import CreateUserModal from "./modals/CreateUserModal.jsx";
import UpdateUserModal from "./modals/UpdateUserModal.jsx";
import { Ripple, initTE } from "tw-elements";
import roles from "../../config/roles.js";
import ActionButtons from "./actionButtons/UserActionButtons.jsx";
import ImportUsersModal from "./modals/ImportUsersModal.jsx";
import Pagination from "../Pagination.jsx";
import { defineElement } from "lord-icon-element";
import Lottie from "lottie-web";
import useNotification from "../../hooks/useNotification.jsx";
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
            Suspended
        </span>
    ),
};

const Librarians = () => {
    useEffect(() => {
        initTE({ Ripple, initTE });
        defineElement(Lottie.loadAnimation);
    }, []);
    const notify = useNotification();

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [createModal, setCreateModal] = useState(false);
    const [_import, set_import] = useState(false);
    const [updateModal, setUpdateModal] = useState({
        state: false,
        id: "",
        f_name: "",
        l_name: "",
        phone: "",
        email: "",
    });
    const [filter, setFilter] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [state, setState] = useState(0);

    const userUniversity = auth?.uni;

    //   main data fetch query
    const { data, isError, error, isLoading, refetch, isRefetching } = useQuery(
        [userUniversity],
        async () => {
            if (userUniversity == undefined) {
                return <></>;
            }
            const response = await axiosPrivate.get(
                `/universities/${userUniversity}/librarians?q=${search}&state=${state}&page=${page}`
            );
            return response.data;
        }
    );

    const toggleMutation = useMutation(
        ({ id, state }) => {
            return axiosPrivate.patch(`/users/${id}/state`, {
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

    const deleteMutation = useMutation(
        (id) => {
            return axiosPrivate.delete(`/users/${id}`);
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
    const handleDeleter = (id) => {
        deleteMutation.mutate(id);
    };

    const handleStateToggler = ({ id, state }) => {
        toggleMutation.mutate({ id, state });
    };
    const handleSearch = (e) => {
        e.preventDefault();
        setState(0);
        setPage(1);
        refetch();
    };

    useEffect(() => {
        refetch();
    }, [state, page]);
    return (
        <>
            <CreateUserModal
                show={createModal}
                setShow={setCreateModal}
                refetch={refetch}
                role={roles.LIBRARIAN}
            />
            <ImportUsersModal
                show={_import}
                setShow={set_import}
                refetch={refetch}
                role={roles.LIBRARIAN}
            />
            <UpdateUserModal
                show={updateModal.state}
                setShow={setUpdateModal}
                refetch={refetch}
                data={updateModal}
            />
            <section className="bg-gray-50 dark:bg-gray-900 ">
            <h2 className="text-4xl my-20 mb-5">Dashboard</h2>

                {/*p-3 sm:p-5 */}
                <div className="mx-auto  ">
                    {" "}
                    {/** px-4 lg:px-12*/}
                    {/* <!-- Start coding here --> */}
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg ">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
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
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            id="default-search"
                                            className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Search Mockups, Logos..."
                                        />
                                        <button
                                            type="submit"
                                            className="text-white absolute right-1 bottom-[5px]  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Search
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button
                                    onClick={() => setCreateModal(true)}
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                    type="button"
                                    className="flex items-center justify-center transition duration-150 ease-in-out text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
                                    Add Librarian
                                </button>
                                <button
                                    onClick={() => set_import(true)}
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                    type="button"
                                    className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
                                    import
                                </button>
                                <div className="flex items-center space-x-3 w-full md:w-auto"></div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">
                                            Teacher
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Contact
                                        </th>
                                        <th scope="col" className="px-4 py-3">
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
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3 text-center"
                                        >
                                            Action
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
                                                    <button>
                                                        <Loader />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        data?.librarians?.map((item) => {
                                            return (
                                                <tr
                                                    className="border-b dark:border-gray-700 "
                                                    key={item?._id}
                                                >
                                                    <th
                                                        scope="row"
                                                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        {item?.l_name}{" "}
                                                        {item?.f_name}
                                                    </th>
                                                    <td className="px-4 py-3">
                                                        {`${item.email} ${item.phone}`}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {states[item?.state]}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="text-center space-x-7 flex ">
                                                            <ActionButtons
                                                                data={item}
                                                                edit={
                                                                    setUpdateModal
                                                                }
                                                                remove={
                                                                    handleDeleter
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
                                !data?.librarians?.length && (
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
                                    {data?.librarians?.length}
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

export default Librarians;

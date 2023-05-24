import { useQueries, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import jwt_decode from "jwt-decode";
import Tabs from "./Tabs";
import useAuth from "../../hooks/useAuth";
import ActionButtons from "./ActionButtons";
import Loader from "../Super_Admin/Loader";
import Filter from "../forms/Filter";
// import { CreateFieldModal, UpdateFieldModal } from "./modals/FieldModals";
import CreateFieldModal from "./modals/CreateFieldModal";
import UpdateFieldModal from "./modals/UpdateFieldModal";
import CreateBranchModal from "./modals/CreateBranchModal";
import UpdateBranchModal from "./modals/UpdateBranchModal";
import CreateSpecialtyModal from "./modals/CreateSpecialtyModal";
import UpdateSpecialtyModal from "./modals/UpdateSpecialtyModal";


const config = {
        fields: {
            add: 'Field',
        },
        branches: {
            add: 'Branch',

        },
        specialties: {
            add: 'Specialty',
        },
    };
const filters = {
    fields: [],
    branches: ["field"],
    specialties: ["field", "branch"],
    courses: ["field", "branch",'specialty'],
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
            Suspended
        </span>
    ),
};

const Fields = () => {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
  
    const [filter, setFilter] = useState(false);

    const [field, setField] = useState(""); //query
    const [branch, setBranch] = useState("");//query
    const [specialty, setSpecialty] = useState("");//query

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);


    const [createModal, setCreateModal] = useState(false);
    const [updateModal, setUpdateModal] = useState({state:false, id:'',previousValue:"", fieldID:'',branchID:'',specialtyID:''});

    const tabItems = ["fields", "branches", "specialties", "courses"];
    const [selectedItem, setSelectedItem] = useState(tabItems[0]);

    const  userUniversity = auth?.uni;
          
  
    const { data, isError, error, isLoading, refetch } = useQuery(
        [selectedItem,userUniversity],
        async () => {
            if (userUniversity == undefined) {
                return <></>
            }   
            const response = await axiosPrivate.get(
                `/universities/${userUniversity}/${selectedItem}`
            );
            // console.log(response.data.filters)
            return response.data;
        }
    );

    


    const handleSearch = (e) => {
        e.preventDefault();
        // setState("");
        setPage(1);
        // refetch();
    };

    return (
        <>
            <Tabs
                tabItems={tabItems}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
            />
                        {
                            // config[selectedItem].modals[0]
                            selectedItem === "fields" ?  <> <CreateFieldModal show={createModal} setShow={setCreateModal} refetch={refetch}  /><UpdateFieldModal show={updateModal.state} setShow={setUpdateModal} data={updateModal} refetch={refetch}/> </> : 
                            selectedItem === "branches" ? <><CreateBranchModal show={createModal} setShow={setCreateModal} refetch={refetch} fields={data?.filters?.field} /><UpdateBranchModal show={updateModal.state} setShow={setUpdateModal} refetch={refetch} fields={data?.filters?.field} data={updateModal} /></> :
                            selectedItem === "specialties" ? <><CreateSpecialtyModal show={createModal} setShow={setCreateModal} refetch={refetch}  branches={data?.filters?.branch} /> <UpdateSpecialtyModal show={updateModal.state} setShow={setUpdateModal} refetch={refetch}  branches={data?.filters?.branch} data={updateModal}/>  </>  :
                            selectedItem === "courses"? <></> :<></>

                        }
 

            <section className="bg-gray-50 dark:bg-gray-900 ">
                <div className="mx-auto   ">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg ">
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
                                onClick={()=> setCreateModal(true)}
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
                                <div className="flex items-center space-x-3 w-full md:w-auto">
                                    <button
                                        id="actionsDropdownButton"
                                        data-dropdown-toggle="actionsDropdown"
                                        className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        type="button"
                                    >
                                        <svg
                                            className="-ml-1 mr-1.5 w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            />
                                        </svg>
                                        Actions
                                    </button>
                                    <div
                                        id="actionsDropdown"
                                        className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                    >
                                        <ul
                                            className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                            aria-labelledby="actionsDropdownButton"
                                        >
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Mass Edit
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="py-1">
                                            <a
                                                href="#"
                                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                            >
                                                Delete all
                                            </a>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setFilter(!filter)}
                                        id="filterDropdownButton"
                                        data-dropdown-toggle="filterDropdown"
                                        className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        type="button"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            className="h-4 w-4 mr-2 text-gray-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Filter
                                        <svg
                                            className="-mr-1 ml-1.5 w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            />
                                        </svg>
                                    </button>
                                    <div
                                        id="filterDropdown"
                                        className={`z-10 ${
                                            filter
                                                ? "absolute w-80 lg:w-48 top-[110px] lg:top-16 right-4 lg:right-0"
                                                : "hidden"
                                        }   p-3 bg-white rounded-lg shadow dark:bg-gray-700`}
                                    >
                                        <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                                            Choose brand
                                        </h6>
                                        <ul
                                            className="space-y-2 text-sm"
                                            aria-labelledby="filterDropdownButton"
                                        >
                                            <li className="flex items-center">
                                                <input
                                                    id="apple"
                                                    type="checkbox"
                                                    value=""
                                                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                />
                                                <label
                                                    htmlFor="apple"
                                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                                >
                                                    Apple (56)
                                                </label>
                                            </li>
                                            <li className="flex items-center">
                                                <input
                                                    id="fitbit"
                                                    type="checkbox"
                                                    value=""
                                                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                />
                                                <label
                                                    htmlFor="fitbit"
                                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                                >
                                                    Microsoft (16)
                                                </label>
                                            </li>
                                            <li className="flex items-center">
                                                <input
                                                    id="razor"
                                                    type="checkbox"
                                                    value=""
                                                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                />
                                                <label
                                                    htmlFor="razor"
                                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                                >
                                                    Razor (49)
                                                </label>
                                            </li>
                                            <li className="flex items-center">
                                                <input
                                                    id="nikon"
                                                    type="checkbox"
                                                    value=""
                                                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                />
                                                <label
                                                    htmlFor="nikon"
                                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                                >
                                                    Nikon (12)
                                                </label>
                                            </li>
                                            <li className="flex items-center">
                                                <input
                                                    id="benq"
                                                    type="checkbox"
                                                    value=""
                                                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                />
                                                <label
                                                    htmlFor="benq"
                                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                                >
                                                    BenQ (74)
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="empty:hidden  px-4 py-2 flex gap-3 flex-col lg:flex-row lg:gap-10 justify-end">
                            {filters[selectedItem]?.map((item, idx) => {
                                return (
                                    <Filter
                                        key={idx}
                                        title={item}
                                        options={data?.filters[item]}
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
                                        <th
                                            scope="col"
                                            className="px-4 py-3"
                                        >{`${selectedItem} name`}</th>
                                        <th scope="col" className="px-4 py-3">
                                            state
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            num of documents
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
                                                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        {item?.name}
                                                        {item?.field?.name && <p>{item.field.name}</p> }
                                                        {item?.branch?.name && <p>{item.branch.name}</p> }
                                                    </th>
                                                    <td className="px-4 py-3">
                                                        {states[item?.state]}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {/* {item?.accounts} */}
                                                        44
                                                    </td>

                                                    <td className="px-4 py-3">
                                                        <div className="text-center space-x-7 flex ">
                                                            <ActionButtons
                                                                // state={
                                                                //     item?.state
                                                                // }
                                                                // id={item?._id}
                                                                data={item}
                                                                edit={setUpdateModal}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Fields;

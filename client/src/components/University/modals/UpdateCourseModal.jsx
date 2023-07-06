import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";
import useNotification from "../../../hooks/useNotification";

const cycles = [
    {
        name: "1ere licance",
        value: "l1",
    },
    {
        name: "2eme licance",
        value: "l2",
    },
    {
        name: "3eme licance",
        value: "l3",
    },
    {
        name: "1ere Master",
        value: "m1",
    },
    {
        name: "2eme Master",
        value: "m2",
    },
];

export default ({
    show,
    setShow,
    refetch,
    fields,
    branches,
    specialties,
    data,
}) => {
    const notify = useNotification();
    const [cycle, setCycle] = useState("");
    const [field, setField] = useState("");
    const [branch, setBranch] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [course, setCourse] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        setErrMsg("");
    }, [course,show]);

    useEffect(() => {
        setCycle(data?.cycle)
        setField(data?.fieldID);
        setBranch(data?.branchID);
        setSpecialty(data?.specialtyID);
        setCourse(data?.previousValue);
    }, [show]);

    const updateMutation = useMutation(
        ({ id, name, branch,field, specialty,cycle }) => {
            return axiosPrivate.patch(`/courses/${id}`, {
                name,
                field,
                branch,
                specialty,
                cycle
            });
        },
        {
            onSuccess: () => {
                refetch();
                setShow({ state: false });
                notify('success');
            },
            onError: (error) => {
                setErrMsg(error.response.data.message);
            },
        }
    );

    const handleUpdater = (e) => {
        e.preventDefault();
        updateMutation.mutate({
            id: data.id,
            name: course,
            cycle,
            field,
            branch,
            specialty,
        });
    };
    return (
        <>
            {/* <!-- Main modal --> */}
            <div
                id="defaultModal"
                tabIndex="-1"
                aria-hidden="true"
                className={`overflow-y-auto overflow-x-hidden ${
                    show ? "fixed" : "hidden"
                } top-0 right-0 bg-[#000000a5] left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full`}
            >
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto mt-40 lg:mt-20">
                    {/* <!-- Modal content --> */}
                    <div className="relative  p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        {/* <!-- Modal header --> */}
                        <div className=" flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white ">
                                Update Course
                                <p
                                    className={`mt-2 ml-2 text-lg lg:inline text-red-600 dark:text-red-500 ${
                                        errMsg ? "block" : "hidden"
                                    } `}
                                >
                                    <span
                                        className={`font-medium  ${
                                            errMsg ? "inline-block" : "hidden"
                                        } `}
                                    >
                                        Oh, snapp!
                                    </span>
                                    {` ${errMsg}`}
                                </p>
                            </h3>
                            <button
                                onClick={() => setShow({ state: false })}
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="defaultModal"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <form onSubmit={handleUpdater}>
                            <div className="grid gap-4 mb-4 ">
                                <div>
                                    <label
                                        htmlFor="category"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Cycle
                                    </label>

                                    <select
                                        id="category"
                                        value={cycle}
                                        onChange={(e) => {
                                            setCycle(e.target.value);
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    >
                                        <option value="">select a Cycle</option>
                                        {cycles?.map((item, idx) => {
                                            return (
                                                <option
                                                    key={idx}
                                                    value={item.value}
                                                >
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="category"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Feild
                                    </label>

                                    <select
                                        id="category"
                                        value={field}
                                        onChange={(e) => {
                                            setField(e.target.value);
                                            setBranch("");
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    >
                                        <option disabled value="">
                                            select a Field
                                        </option>
                                        {fields?.map((item, idx) => {
                                            return (
                                                <option
                                                    key={idx}
                                                    value={item._id}
                                                >
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="category"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Branch
                                    </label>

                                    <select
                                        id="category"
                                        value={branch}
                                        onChange={(e) =>{
                                            setBranch(e.target.value)
                                            setSpecialty("")}
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    >
                                        <option disabled value="">
                                            select a Branch
                                        </option>
                                        {branches?.map((item, idx) => {
                                            // if(item.field == field){

                                            // }
                                            return item.field == field ? (
                                                <option
                                                    key={idx}
                                                    value={item._id}
                                                >
                                                    {item.name}
                                                </option>
                                            ): <></>
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="category"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Specialty
                                    </label>

                                    <select
                                        id="category"
                                        value={specialty}
                                        onChange={(e) =>
                                            setSpecialty(e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    >
                                        <option value="">
                                            select a Specialty
                                        </option>
                                        {specialties?.map((item, idx) => {
                                            return item.branch == branch ? (
                                                <option
                                                    key={idx}
                                                    value={item._id}
                                                >
                                                    {item.name}
                                                </option>
                                            ) : (
                                                <></>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Name
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setCourse(e.target.value)
                                        }
                                        value={course}
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                        placeholder="Type course name"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex gap-x-3  ">
                                <button
                                    type="submit"
                                    className="text-white max-w-1/2-lg bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                                >
                                    save
                                </button>
                                <button
                                    onClick={() => setShow({ state: false })}
                                    type="button"
                                    className="text-white max-w-1/2-lg bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

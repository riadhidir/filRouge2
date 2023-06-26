import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import DynamicFilter from "../components/Home/Filter";
import StaticFilter from "../components/Home/Filter_2";
import BasicCard from "../components/Home/Cards/BasicCard";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { downloadDocument } from "../api/axios";
import Pagination from "../components/Pagination";

const config = {
    type: ["Tp", "Td", "Exam", "FinalThesis", "PhdThesis"],
    
};

const resetfilters = (refs) => {
    refs.current.map((ref, idx) => {
        // console.log(Boolean(ref));
        ref && (ref.checked = false);
    });
};

const Basic = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        field: "",
        branch: "",
        specialty: "",
        course: "",
        cycle: "",
        type: "",
    });

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const [field, setField] = useState("");
    const [branch, setBranch] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [course, setCourse] = useState("");
    const [type, setType] = useState("Exam");
    const [cycle, setCycle] = useState("");
    const axiosPrivate = useAxiosPrivate();
    const [q, setQ] = useState("");
    const typeRef = useRef([]); //all check options
    const fieldRef = useRef([]); //all check options
    const branchRef = useRef([]); //all check options
    const specialtyRef = useRef([]); //all check options
    const courseRef = useRef([]); //all check options

    const [side, setSide] = useState(false);
    useEffect(() => {
        setSelectedFilters({
            field,
            branch,
            specialty,
            course,
            cycle,
            type,
        });
        // refetch()
    }, [field, branch, specialty, course, type]);

    // const [fieldReset, setFieldReset] = useState(false)

    useEffect(() => {
        setField("");
        resetfilters(fieldRef);
    }, [type]);

    useEffect(() => {
        setBranch("");
        resetfilters(branchRef);
    }, [field]);

    useEffect(() => {
        setSpecialty("");
        resetfilters(specialtyRef);
    }, [branch]);

    useEffect(() => {
        setCourse("");
        resetfilters(courseRef);
    }, [field, branch, specialty]);

    const { data, isLoading, refetch } = useQuery(
        ["documents", type, cycle, page],
        async () => {
            const response = await axiosPrivate.get(
                `/library/documents?type=${type}&q=${q}&cycle=${cycle}&course=${course}&page=${page}`
            );
            // console.log(response.data);
            setPages(response.data.totalPages);

            return response.data;
        }
    );

    // useEffect(()=>{
    //   // setField('');
    //   // setField('');

    // console.log({field,branch,specialty,course})
    // },[field,branch, specialty,course]);
    // style={{background: "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)"}}
    return (
        <div className="min-h-screen pb-5 bg-slate-100 relative overflow-clip">
            <img className='absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 blur-md' src="/logo_3.png" alt="" />
            <div className="w-36 aspect-square rounded-full bg-indigo-500 absolute top-20 right-10 blur-3xl "></div>
                <div className="w-36 aspect-square rounded-full bg-indigo-500 absolute top-100 left-0 blur-3xl  "></div>
                <div className="w-28 aspect-square rounded-full bg-indigo-500 absolute top-2/3 left-0 blur-3xl  "></div>
                <div className="w-28 aspect-square rounded-full bg-indigo-500 absolute top-1/2 right-0 blur-3xl  "></div>
                <div className="w-28 aspect-square rounded-full bg-indigo-500 absolute -bottom-12 right-1/3 blur-3xl  "></div>
            {/* filter side bar */}
            <div
                className={`flex lg:hidden  px-5 flex-col gap-7 bg-white absolute top-0 left-0 z-50 w-full h-screen overflow-auto ${
                    side ? "translate-x-0" : "-translate-x-full"
                } transition-all`}
            >
                <button className=" mt-5" onClick={() => setSide(false)}>
                    <svg
                        className="w-10 ml-auto"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>

                {["PhdThesis", "FinalThesis"].includes(type) && (
                    <form>
                        {/* <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label> */}
                        <div className="relative">
                            <input
                                onChange={(e) => setQ(e.target.value)}
                                value={q}
                                type="search"
                                id="default-search"
                                className="block w-full p-4 h-12 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search ..."
                                required
                            />
                            <button
                                type="submit"
                                className=" text-white   absolute right-1 bottom-2.5 top-1 w-10 h-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <svg
                                    aria-hidden="true"
                                    className=" w-5 h-5 relative right-1/2   text-white dark:text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox=" 0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </form>
                )}

                <StaticFilter
                    title="Document Types"
                    setAction={setType}
                    data={config.type}
                    checkRef={typeRef}
                    _default={type}
                    // className="border-indigo-500"
                />
                <DynamicFilter
                    title="fields"
                    setAction={setField}
                    checkRef={fieldRef}
                />
                {field !== "" && (
                    <DynamicFilter
                        title="branches"
                        setAction={setBranch}
                        field={field}
                        checkRef={branchRef}
                    />
                )}
                {branch !== "" && (
                    <DynamicFilter
                        title="specialties"
                        setAction={setSpecialty}
                        branch={branch}
                        checkRef={specialtyRef}
                    />
                )}
                {field !== "" && (
                    <DynamicFilter
                        title="courses"
                        setAction={setCourse}
                        field={field}
                        branch={branch}
                        specialty={specialty}
                        checkRef={courseRef}
                    />
                )}
                {/* <Filter title="Branches"/> */}
            </div>
{/* end of side filter  */}

            <Navbar />

            <div className="max-w-screen-xl lg:mx-auto mx-5 backdrop-blur-sm bg-white/50  my-10 p-4 rounded-lg border-2 border-white relative">
                <p className="text-5xl text-center ">Library</p>
    
            </div>

            <section className="max-w-screen-xl h-full mx-auto grid grid-cols-12 gap-10 overflow-x-hidden  ">
                {/* filters */}
                <div className="hidden lg:flex col-span-3  flex-col gap-7">
                    {["PhdThesis", "FinalThesis"].includes(type) && (
                        <form>
                            {/* <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label> */}
                            <div className="relative">
                                <input
                                    onChange={(e) => setQ(e.target.value)}
                                    value={q}
                                    type="search"
                                    id="default-search"
                                    className="block w-full p-4 h-12 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search ..."
                                    required
                                />
                                <button
                                    type="submit"
                                    className=" text-white   absolute right-1 bottom-2.5 top-1 w-10 h-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className=" w-5 h-5 relative right-1/2   text-white dark:text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox=" 0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </form>
                    )}

                    <StaticFilter
                        title="Document Types"
                        setAction={setType}
                        data={config.type}
                        checkRef={typeRef}
                        _default={type}
                    />
                    <DynamicFilter
                        title="fields"
                        setAction={setField}
                        checkRef={fieldRef}
                    />
                    {field !== "" && (
                        <DynamicFilter
                            title="branches"
                            setAction={setBranch}
                            field={field}
                            checkRef={branchRef}
                        />
                    )}
                    {branch !== "" && (
                        <DynamicFilter
                            title="specialties"
                            setAction={setSpecialty}
                            branch={branch}
                            checkRef={specialtyRef}
                        />
                    )}
                    {field !== "" && (
                        <DynamicFilter
                            title="courses"
                            setAction={setCourse}
                            field={field}
                            branch={branch}
                            specialty={specialty}
                            checkRef={courseRef}
                        />
                    )}
                    {/* <Filter title="Branches"/> */}
                </div>

                <div className="col-span-12 lg:col-span-9 bg-blue-00 h-full w-screen lg:w-auto px-5">
                    {/* display selected filters */}
                    <div className="flex gap-2 mb-5 w-full">
                        {Object.keys(selectedFilters).map((key, idx) => {
                            if (selectedFilters[key] !== "") {
                                return (
                                    <div
                                        className="cursor-pointer "
                                        key={idx}
                                        onClick={() => alert()}
                                    >
                                        <button className="bg-white px-4 py-2 rounded-full">
                                            {selectedFilters[key]}
                                        </button>
                                    </div>
                                );
                            }
                        })}
                        <div
                            className="relative cursor-pointer "
                            onClick={() => {
                                resetfilters(fieldRef);
                                resetfilters(branchRef);
                                resetfilters(specialtyRef);
                                resetfilters(courseRef);
                                setField("");
                                setBranch("");
                                setSpecialty("");
                                setCourse("");
                            }}
                        >
                            <button className="bg-red-400 px-4 py-2 rounded-full text-white border-2 border-white">
                                reset filters
                            </button>
                        </div>
                    </div>
                    {/* display results length */}
                    <div className="flex flex-col lg:flex-row justify-between items-center align-middle mb-8 gap-3">
                        <p className="w-full">
                            Showing {data?.documents?.length} of {data?.count}{" "}
                            results
                        </p>
                        <div className="w-full flex gap-2 items-center  justify-between lg:justify-end ">
                               <button
                            className=" inline-block lg:hidden px-4 py-1.5 bg-indigo-500 rounded-full text-white"
                            onClick={() => setSide(true)}
                        >
                            <svg
                                className="w-5 inline-block mr-1"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                                ></path>
                            </svg>
                            Filters
                        </button>
            
                {
                                ["PhdThesis", "FinalThesis"].includes(type) ?  <>
                                </> :<>
                        <div className="relative  ">
           <svg xmlns="http://www.w3.org/2000/svg"  className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-2.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
                                <select onChange={(e)=>setCycle(e.target.value)} id="s" className="w-56  px-3 p-1.5 text-gray-500 bg-white border rounded-full shadow-sm outline-none appearance-none focus:border-indigo-600">
                <option value="">Select a Cycle</option>
                                <option value="l1">1st year of Bachelor's degree</option>
                                <option value="l2">2nd year of Bachelor's degree</option>
                                <option value="l3">3rd year of Bachelor's degree</option>
                                <option value="m1">1st year of Master's degree</option>
                                <option value="m2">2st year of Master's degree</option>
            </select>

        </div>
                                </> 
                              
                            }
                




                        </div>
                     
                    </div>

                    {/* display documents */}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-3  ">
                        {["Tp", "Td", "Exam"].includes(type) &&
                            data?.documents?.map((item) => {
                                return (
                                    <BasicCard document={item} key={item._id} />
                                );
                            })}
                        {["PhdThesis", "FinalThesis"].includes(type) &&
                            data?.documents?.map((item) => {
                                // const author = `${item.authors[0].l_name[0]}.${item.authors[0].f_name}`
                                return (
                                    <BasicCard document={item} key={item._id} />
                                );
                            })}
                    </div>
                </div>
            </section>
            <div className="max-w-screen-xl mx-auto flex justify-end ">
                <Pagination
                    page={page}
                    pages={pages}
                    changePage={setPage}
                ></Pagination>
            </div>

            {/* <Outlet/> */}
        </div>
    );
};

export default Basic;

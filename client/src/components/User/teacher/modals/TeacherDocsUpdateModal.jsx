import { useEffect, useState } from "react";

// import useFileUpload from "../../../hooks/useFileUpload";

import {
    faFile,
    faCheck,
    faTimes,
    faSpinner,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../hooks/useAuth";
import Loader from "../../../Loader";
import useFileUpload from "../../../../hooks/useFileUpload";
import { toast } from "react-toastify";

const currentYear = new Date().getFullYear();

const years = Array.from({ length: 10 }, (_, index) => {
    const year = currentYear - index;
    return { _id: year, name: year.toString() };
});

const _language = [
    { _id: "fr", name: "French" },
    { _id: "en", name: "English" },
];

const TeacherDocsUpdateModal = ({ show, setShow, data, author , target}) => {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const university = auth.uni;
 
   
    const [cycle, setCycle] = useState("");
    const [field, setField] = useState("");
    const [branch, setBranch] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [course, setCourse] = useState("");
    const [year, setYear] = useState(0);
    const [language, setLanguage] = useState("");
    const [description, setDescription] = useState("");
    const [authors, setAuthors] = useState([]);
    const [type, setType] = useState("");

    const [subjectFile, setSubjectFile] = useState({ file: null });
    const [solutionFile, setSolutionFile] = useState({ file: null });

    const [previousFilesStates,setPreviousFilesStates ] = useState({subjectFile:false,solutionFile:false});

    const [modalIndex, setModalIndex] = useState(1);

    const [errMsg, setErrMsg] = useState("");

    useEffect(()=>{
        setAuthors([author]);
    },[author]);
 
    // Create a storage reference from our storage service
    const {updateFile} = useFileUpload();
    const [uploadStart, setUploadStart] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // setUploadStart(true);
        setModalIndex(1);

        setShow(false);
        try {
            await toast.promise (async () => {
                let subjectObj,solutionObj;
                if(previousFilesStates.subjectFile != false){
                    // const subjectArray = await uploadFile(subjectFile, previousFilesStates.subjectFile);
                     subjectObj = await updateFile(subjectFile, previousFilesStates.subjectFile); 

                }else{
                    subjectObj = subjectFile.file
                }
                if(previousFilesStates.solutionFile != false){
                    // const subjectArray = await uploadFile(subjectFile, previousFilesStates.subjectFile);
                    solutionObj = await updateFile(solutionFile, previousFilesStates.solutionFile); 

                }else{
                    solutionObj = solutionFile.file

                }
 
                uploadMutation.mutate({
                    course,
                    type,
                    cycle,
                    language,
                    subject: subjectObj,
                    answer: solutionObj,
                    authors,
                    description,
                    date: year,
                    title: "random",
                    university,
                });
            },{
                pending: 'Update is pending',
                success: 'Update Successful 👌',
                error: 'Update Error! try again :('
              }
            );
        } catch (err) {
            console.error(err);
        }
    };
  
 
    const uploadMutation = useMutation(
        async (body) => {
            console.log({ body });
            return await axiosPrivate.put(`/documents/teacherDocs/${target.id}`, body);
        },
        {
            onSuccess: (data) => {
                // refetch();
                // resetInputForm();
        setPreviousFilesStates({subjectFile:false,solutionFile:false});

                console.log("success");
                alert("upload success");
                setModalIndex(1);
                setShow(false);
            },
            onError: (error) => {
                console.log(error);
                if (!error?.response) {
                    setErrMsg("No Server Response");
                } else {
                    setErrMsg(error.response.data.message);
                }
            },
        }
    );
    const removeSubjectFile = () => {
        setPreviousFilesStates({subjectFile:subjectFile.file.ref,solutionFile:false});
        setSubjectFile({ file: null });

    };

    const removeSolutionFile = () => {
        setSolutionFile({ file: null });
        setPreviousFilesStates({subjectFile:false,solutionFile:solutionFile.file.ref});

    };

   
    useEffect(() => {
        setPreviousFilesStates({subjectFile:false,solutionFile:false});

        const defaultSpecialty =  data.course?.filter((course) => course?._id === target.course) || [];
        const defaultBranch =  data.course?.filter((course) => course?._id === target.course)|| [] ;
        const defaultField =  data.course?.filter((course) => course?._id === target.course) || [];

        setCycle(target.cycle)
        setBranch(defaultBranch[0]?.branch)
        setField(defaultField[0]?.field)
        setSpecialty(defaultSpecialty[0]?.specialty)
        setCourse(target.course)

        setType(target.type)
        setLanguage(target.language)
        setYear(target.date)

        setDescription(target.description)
        setUploadStart(false);
        setSubjectFile({file:target.subject});
        setSolutionFile({file:target.answer});
        // removeSolutionFile();
        // removeSubjectFile();
        
    }, [show]);
    useEffect(()=>{
        console.log(subjectFile)

    },[subjectFile])

    return (
        <>
            <div
                id="defaultModal"
                tabIndex="-1"
                className={`overflow-y-auto overflow-x-hidden ${
                    show ? "fixed" : "hidden"
                } top-0 right-0 bg-[#000000a5] left-0 z-50 justify-center items-center w-full md:inset-0 h-[100vh] md:h-full`}
            >
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto mt-20 lg:mt-20"
>
                    {/* <!-- Modal content --> */}
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:py-3 sm:px-4  ">
                           {/* loader */}
                    <div className={` ${uploadStart? 'flex':'hidden'} absolute z-50 h-full w-full bg-[#000000a5] right-0 top-0 rounded-lg  place-content-center place-items-center`}> <Loader/></div>

                        {/* <!-- Modal header --> */}
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Update Documents
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
                        <form onSubmit={handleSubmit} className="">
                            <div
                                className={`${
                                    modalIndex == 1 ? "block" : "hidden"
                                } w-full flex flex-col gap-2 h-96    `}
                            >
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Cycle
                                    </label>
                                    <CustomSelect
                                        title="Cycle"
                                        options={data?.cycle}
                                        setValue={setCycle}
                                        Value={cycle}
                                    />
                                </div>

                                <div className=" ">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Field
                                    </label>
                                    <CustomSelect
                                        title="Field"
                                        options={data?.field}
                                        setValue={setField}
                                        Value={field}
                                    />
                                </div>
                                <div className=" ">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Branch
                                    </label>
                                    <CustomSelect
                                        title="Branch"
                                        options={data?.branch}
                                        setValue={setBranch}
                                        Value={branch}
                                        indexData={{ name: "field", id: field }}
                                    />
                                </div>
                                <div className=" ">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Specialty
                                    </label>
                                    <CustomSelect
                                        title="Specialty"
                                        options={data?.specialty}
                                        setValue={setSpecialty}
                                        Value={specialty}
                                        indexData={{
                                            name: "branch",
                                            id: branch,
                                        }}
                                    />
                                </div>
                                <div className=" ">
                                    <label
                                        htmlFor="course"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Course
                                    </label>

                                    <select
                                        id="course"
                                        value={course}
                                        onChange={(e) => {
                                            setCourse(e.target.value);
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                    >
                                        <option value="">
                                            select a Course
                                        </option>
                                        {data?.course?.map((item) => {
                                            return (
                                                item.cycle == cycle &&
                                                item.field == field &&
                                                item.branch == branch &&
                                                item.specialty == specialty && (
                                                    <option
                                                        key={item?._id}
                                                        value={item._id}
                                                    >
                                                        {" "}
                                                        {item.name}{" "}
                                                    </option>
                                                )
                                            );
                                        })}
                                    </select>
                                    {/* <CustomSelect title="Course" options={data?.course} setValue={setCourse} Value={course}  /> */}
                                </div>
                            </div>
                            <div
                                className={`${
                                    modalIndex == 2 ? "block" : "hidden"
                                } w-full flex flex-col gap-2 h-96`}
                            >
                                {/* <div className=" flex flex-nowrap gap-2  "> */}
                                <div className="w-full">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Type
                                    </label>
                                    <CustomSelect
                                        title="Type"
                                        options={data?.type}
                                        setValue={setType}
                                        Value={type}
                                    />
                                </div>
                                <div className="w-full">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Date
                                    </label>
                                    <CustomSelect
                                        title="Year"
                                        options={years}
                                        setValue={setYear}
                                        Value={year}
                                    />
                                </div>
                                <div className="w-full">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Language
                                    </label>
                                    <CustomSelect
                                        title="Language"
                                        options={_language}
                                        setValue={setLanguage}
                                        Value={language}
                                    />
                                </div>
                                {/* </div> */}
                                
                                {/* <div className="w-full">
                                    <label
                                        htmlFor="collab"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Collaborators
                                    </label>
                                    <select
                                        id="collab"
                                        value={""}
                                        onChange={(e) => {
                                            setAuthors((prev)=> [...prev,e.target.value]);
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                    >
                                        <option value="">
                                            select Collaborators
                                        </option>
                                        {data?.teachers?.map((item) => {
                                           
                                                    <option
                                                        key={item?._id}
                                                        value={item._id}
                                                    >
                                                        
                                                        {`${item.f_name} ${item.l_name}`}
                                                    </option>
                                            
                                            
                                        })}
                                    </select>
                                </div>

                                <div className="flex">
                                    {
                                        authors.map((item, idx)=>{
                               return  <button onClick={(idx)=>removeAuthor(idx)} className="bg-indigo-500 hover:bg-indigo-400  px-2 py-1 rounded-full text-white text-sm">teacher 1</button>
                                
                                        })
                                    }
                                <button className="bg-indigo-500 hover:bg-indigo-400  px-2 py-1 rounded-full text-white text-sm">teacher 1</button>
                                </div> */}

                                <div className=" ">
                                    <label
                                        htmlFor="description"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Description
                                    </label>

                                    <textarea
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        value={description}
                                        id="message"
                                        rows="4"
                                        className=" block p-2.5 w-full  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write your thoughts here..."
                                    ></textarea>
                                </div>
                            </div>
                            <div
                                className={`${
                                    modalIndex == 3 ? "block" : "hidden"
                                } w-full flex flex-col gap-2 h-fit justify-around   `}
                            >
                                <div className="">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Subject
                                    </label>
                                    {subjectFile.file == null ? (
                                        <label
                                            htmlFor="dropzone-file1"
                                            className=" w-full flex flex-col items-center justify-center  h-auto border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-10 h-10 mb-3 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                    ></path>
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">
                                                        Click or drag to upload
                                                        Subject
                                                    </span>
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    
                                                         "PDF"
                                                </p>
                                            </div>
                                            <input
                                                onChange={(e) =>
                                                    setSubjectFile({
                                                        file: e.target.files[0],
                                                    })
                                                }
                                                id="dropzone-file1"
                                                type="file"
                                                className="hidden"
                                            />
                                        </label>
                                    ) : (
                                        <div className="h-full py-1 relative">
                                            <div className="inline-flex  m-1 flex-wrap  px-2 py-2 bg-indigo-50 border border-indigo-500   rounded-lg w-full gap-5 items-center ">
                                                {/* <FontAwesomeIcon
                                                
                                                    icon="/PDF-icon.svg"
                                                    size="7x"
                                                /> */}

                                                <img
                                                    src="/PDF_icon.svg"
                                                    alt=""
                                                    className="h-16"
                                                />
                                                <div className="">
                                                    <p className="font-bold">
                                                    {subjectFile?.file?.ref?.split('/')[1].split('_')[1] ||  
                                                                subjectFile?.file?.name}
                                                        {/* Subject File */}

                                                    </p>
                                                   
                                                </div>
                                            </div>

                                            <button
                                               type="button"
                                               onClick={removeSubjectFile}
                                               className="absolute top-0 right-5 translate-x-1/2  group  bg-indigo-50 hover:bg-indigo-500 rounded  border border-indigo-500 hover:border-indigo-50 "
                                           >
                                               <FontAwesomeIcon
                                                   icon={faTrash}
                                                   
                                                   className="mx-1 text-indigo-500 group-hover:text-indigo-50 "
                                               />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Solution
                                    </label>
                                    {solutionFile.file == null ? (
                                        <label
                                            htmlFor="dropzone-file"
                                            className="w-full flex flex-col items-center justify-center  h-auto border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-10 h-10 mb-3 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                    ></path>
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">
                                                        Click or drag to upload
                                                        Solution
                                                    </span>
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    PDF
                                                </p>
                                            </div>
                                            <input
                                                onChange={(e) =>
                                                    setSolutionFile({
                                                        file: e.target.files[0],
                                                    })
                                                }
                                                id="dropzone-file"
                                                type="file"
                                                className="hidden"
                                            />
                                        </label>
                                    ) : (
                                        <div className="h-full py-1 relative">
                                            <div className="inline-flex  m-1 flex-wrap  px-2 py-2 border bg-indigo-50 border-indigo-500  rounded-lg w-full gap-5 items-center ">
                                                {/* <FontAwesomeIcon
                                                
                                                    icon="/PDF-icon.svg"
                                                    size="7x"
                                                /> */}

                                                <img
                                                    src="/PDF_icon.svg"
                                                    alt=""
                                                    className="h-16"
                                                />
                                                <div className="">
                                                    <p className="font-bold">
                                                
                                                    {solutionFile?.file?.ref?.split('/')[1].split('_')[1] || solutionFile?.file?.name}

                                                       
                                                    </p>
                                                   
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={removeSolutionFile}
                                                className="absolute top-0 right-5 translate-x-1/2  group  bg-indigo-50 hover:bg-indigo-500 rounded  border border-indigo-500 hover:border-indigo-50 "
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                 
                                                    className="mx-1 text-indigo-500 group-hover:text-indigo-50 "
                                                />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-4 justify-between mt-5  ">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setModalIndex((prev) => prev - 1)
                                    }
                                    className={`${
                                        modalIndex == 1 ? "hidden" : "block"
                                    } text-white  bg-indigo-700 disabled:bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800`}
                                >
                                    Back
                                </button>
                                <button
                                    onClick={() =>
                                        setModalIndex((prev) => prev + 1)
                                    }
                                    type="button"
                                    className={`${
                                        modalIndex == 3 ? "hidden" : "block"
                                    } ml-auto justify-self-end  text-white  bg-indigo-700 disabled:bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800`}
                                >
                                    Next
                                </button>
                                <button
                                disabled={subjectFile.file == null || course=="" || type =="" || language== "" || year=="" || cycle== ""}
                                    type="submit"
                                    className={`${
                                        modalIndex == 3 ? "block" : "hidden"
                                    } text-white inline-flex items-center bg-indigo-700 disabled:bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800`}
                                >
                                    <svg
                                        className="mr-1 -ml-1 w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    Add new product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
const CustomSelect = ({ title, options, indexData, setValue, Value }) => {
    // console.log({Value})
    return (
        <select
            id="category"
            value={Value}
            onChange={(e) => {
                setValue(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
        >
            <option value="">select a {title}</option>
            {options?.map((item) => {
                if (indexData) {
                    return (
                        item[indexData.name] == indexData.id && (
                            <option key={item?._id} value={item._id}>
                                {" "}
                                {item.name}{" "}
                            </option>
                        )
                    );
                } else {
                    return (
                        <option key={item?._id} value={item._id}>
                            {" "}
                            {item.name}{" "}
                        </option>
                    );
                }
            })}
        </select>
    );
};

const formatFileSize = (bytes) => {
    if (bytes >= 1024 * 1024) {
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    } else if (bytes >= 1024) {
        return (bytes / 1024).toFixed(2) + " KB";
    } else {
        return bytes + " bytes";
    }
};
export default TeacherDocsUpdateModal;

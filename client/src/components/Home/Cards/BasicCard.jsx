import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { downloadDocument } from "../../../api/axios";
// import useFileUpload from "../../../hooks/useFileUpload";

const BasicCard = ({
    // title,
    // university,
    // author,
    // type,
    // donwloads = 0,
    // rating = 0,
    // subject,
    // link,
    // answer
    document
}) => {

const author = ['Td','Tp','Exam'].includes(document.type) ? `/ ${document?.authors[0]?.l_name[0]}.${document?.authors[0]?.f_name}` : "" ;
    const downloadMutation = useMutation(downloadDocument, {
        onSuccess: (response) => {
          console.log("success");
        },
        onError: (error) => {
            setErrMsg(error.response.data.message);
        },
      });
      
      const handleDownload = (id)=>{
        downloadMutation.mutate(id);
      }
   
    return (

        <div className=" flex  bg-white  border-[2px]  border-white  rounded-lg p-5  gap-1 flex-col shadow-lg relative group" 
       >
            
            <div className="flex flex-col justify-between w-full gap-4">
                <h3 className=" flex justify-between text-xl font-medium text-blue-600   capitalize ">
                    {document.title}
                    <span className="flex gap-2 justify-end">
                        <Stars />
                        <p>{document.ratings}</p>
                    </span>
                </h3>

                <div className="flex justify-between items-center">
                    <p className="capitalize">{`${document.university.name}  ${author }`}</p>

                    <div className="flex gap-2">
                        <p className="inline-flex items-center px-2 py-1 bg-slate-500 text-xs rounded-lg text-white capitalize ">{`${document.type}`}</p>
                        <p className="inline-flex px-2 py-1 bg-slate-500  text-sm rounded-lg text-white gap-2">
                            <svg
                                className="w-5"
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
                                    d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
                                ></path>
                            </svg>
                            {`${document.downloads}`}
                        </p>
                    </div>
                </div>
            </div>
                <div className="hidden h-full w-full bg-slate-500/50 backdrop-blur-sm absolute top-0 right-0 rounded-lg group-hover:flex place-items-center place-content-center gap-5">
                {
                    ['Td','Tp','Exam'].includes(document.type) ? <>
                        <Link to ={document.subject.url} className="px-3 py-1.5 bg-white rounded-full  " target="_blank"  onClick={()=>handleDownload(document._id)}>subject</Link>
                        <Link to ={document.answer.url} className="px-3 py-1.5 bg-[#f87171] rounded-full text-white" target="_blank" onClick={()=>handleDownload(document._id)}>answer</Link>
                    </>
                     :                           <Link to ={document.link.url} className="px-3 py-1.5 bg-[#f87171] rounded-full text-white" target="_blank" onClick={()=>handleDownload(document._id)}>preview</Link>

                         
                    
                }
                    
                </div>
        </div>
    
    );
};

export default BasicCard;

const Stars = () => {
    return (
        <button>
            <svg
                className="h-5 hover:fill-yellow-400 fill-yellow-50 stroke-black"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                ></path>
            </svg>
        </button>
    );
};

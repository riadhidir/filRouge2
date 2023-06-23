import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Collapse, initTE } from "tw-elements";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";



const Filter = ({ title, show = false, setAction , field="", branch="", specialty="",_default="",data, checkRef}) => {
    useEffect(() => {
        initTE({ Collapse });
        // console.log(data)
    }, []);

    // const axiosPrivate = useAxiosPrivate();


     
    const [drop, setDrop] = useState(false);
    

    return (
        <div
            id={`${title.split(' ').join('')}-accordion`}
            className=" px-8 py-7 text-sm font-medium text-gray-900 bg-white/50 border-2 border-white rounded-lg dark:bg-gray-700 dark:border-gray-600 h-fit dark:text-white  "
        >
            <button
                id={title.split(' ').join('')}
                data-te-collapse-init
                data-te-target={`#collapse${title.split(' ').join('')}`}
                aria-expanded={show} // show by default
                aria-controls={`collapse${title.split(' ').join('')}`}
                className="flex justify-between items-center text-xl w-full text-start"
                onClick={() => setDrop(!drop)}
            >
                {title}
                <svg
                    className={`w-5 ${
                        drop ? "rotate-180" : "rotate-0"
                    } transition-all duration-150`}
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
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    ></path>
                </svg>
            </button>

            <hr className="w-8 h-1 my-2 mb-3 bg-indigo-500 border-0 rounded  dark:bg-gray-700" />
            <div
                id={`collapse${title.split(' ').join('')}`}
                className={`!visible  ${
                    show ? "" : "hidden"
                }  overflow-y-auto space-y-5`} //show by default // add hidden to hide
                data-te-collapse-item
                //    data-te-collapse-show     //show by default
                //    data-te-collapse-coll apsed
                aria-labelledby={title.split(' ').join('')}
                data-te-parent={`#${title.split(' ').join('')}-accordion`}
            >
                {/* body */}


{

    data?.map((item,idx)=>{
        return (
            <div className="flex items-center mb-4 border-b-2 last:border-b-0 pb-2 border-gray-200" key={`${title}-radio-${idx}`}>
                    <input
                   ref={(ref)=> checkRef.length !==0 && (checkRef.current[idx] = ref)}
                checked ={_default=== item}
                    onChange={()=> setAction(item)}
                        id={`${title.split(' ').join('')}-radio-${idx}`}
                        type="radio"
                        value={item}
                        name={title}
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300    dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                        htmlFor={`${title.split(' ').join('')}-radio-${idx}`}
                        className="ml-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                    >
                        {item}
                    </label>
                </div>
        )
    })
}
<p className="hidden first:block">fzef</p>

               
            </div>
        </div>
    );
};

export default Filter;

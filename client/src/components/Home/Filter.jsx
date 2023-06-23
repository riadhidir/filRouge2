import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Collapse, initTE } from "tw-elements";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


const config = {
    fields:  ""    
}
const Filter = ({ title, show = false, setAction , field="", branch="", specialty="", checkRef }) => {
    useEffect(() => {
        initTE({ Collapse });
    }, []);

    const axiosPrivate = useAxiosPrivate();


        const{data, isLoading, refetch} = useQuery([title], async () => {
 
        const response = await axiosPrivate.get(
            `/library/${title}?field=${field}&branch=${branch}&specialty=${specialty}`
        );
        return response.data;
    });

    const [drop, setDrop] = useState(false);
    useEffect(()=>{
        refetch()
        // checkRef=[];
        // console.log({tt: checkRef});
    },[field,branch,specialty]);
    

    return (
        <div
            id={`${title}-accordion`}
            className=" px-8 py-7 text-sm font-medium text-gray-900 bg-white/50 border-2 border-white rounded-lg dark:bg-gray-700 dark:border-gray-600 h-fit dark:text-white  "
        >
            <button
                id={title}
                data-te-collapse-init
                data-te-target={`#collapse${title}`}
                aria-expanded={show} // show by default
                aria-controls={`collapse${title}`}
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
                id={`collapse${title}`}
                className={`!visible  ${
                    show ? "" : "hidden"
                }  overflow-y-auto space-y-5`} //show by default // add hidden to hide
                data-te-collapse-item
                //    data-te-collapse-show     //show by default
                //    data-te-collapse-coll apsed
                aria-labelledby={title}
                data-te-parent={`#${title}-accordion`}
            >
                {/* body */}


{
//    console.log(data)
    data?.map((item,idx)=>{
        return (
            <div className="flex items-center mb-4 border-b-2 last:border-b-0 pb-2 border-gray-200" key={`${title}-radio-${idx}`}>
                    <input
                   ref={(ref)=> checkRef.length !==0 && (checkRef.current[idx] = ref)}
                    onChange={()=> setAction(item)}
                        id={`${title}-radio-${idx}`}
                        type="radio"
                        value={item}
                        name={title}
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300    dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                        htmlFor={`${title}-radio-${idx}`}
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

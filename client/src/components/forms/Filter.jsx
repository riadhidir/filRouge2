import React from "react";

const Filter = ({title, action, options}) => {
    return (
        <>
                <select
                    
                    onChange={(e)=> action(e.target.value)}
                    className="block py-2.5 px-0 w-full lg:w-52 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                    <option  disabled value=""   className="capitalize">
                        {title}
                    </option>
                    {options?.map((item,idx)=>{
                        return <option key={idx} value={item._id}>{item.name}</option>
                    })}
                </select>
          
        </>
    );
};

export default Filter;

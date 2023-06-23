import React from "react";

const Filter = ({ title, action, options, value }) => {
    return (
        <>
            <select 
                onChange={(e) => action(e.target.value)}
                className="block w-40 capitalize py-2.5 px-0   text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
                <option value={value}>{title}</option>
                {options?.map((item, idx) => {
                    return (
                        <option key={item._id} value={item._id}>
                            {item.name}
                        </option>
                    );
                })}
            </select>
        </>
    );
};

export default Filter;

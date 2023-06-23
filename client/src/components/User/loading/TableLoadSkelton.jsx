import React from 'react'

const tableLoadSkelton = () => {
  return (
   <>
     <tr
                                                className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700  animate-pulse"

                                            >
                                                <td className="w-4 px-4 py-3">
                                                    <div className="flex items-center">
                                                    <div className="h-2.5 bg-indigo-50 rounded-full dark:bg-gray-600 w-3 mb-2.5"></div> 

                                                    </div>
                                                </td>
                                                <th
                                                    scope="row"
                                                    className="flex flex-col items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                  
                                                    
                                                    <div className="h-2.5 bg-indigo-50 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div> 
                                                    <div className="h-2.5 bg-indigo-50 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                    
                                                </th>
                                                <td className="px-4 py-2">
                   
                                                    <div className="h-2.5 bg-indigo-50 rounded-full dark:bg-gray-600 w-full mb-2.5"></div> 


                                                </td>
                                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div className="flex items-center">
                                                    <div className="h-2.5 bg-indigo-50 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div> 

                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className="h-2.5 bg-indigo-50 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div> 

                                                </td>
                                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className="h-2.5 bg-indigo-50 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div> 

                                                </td>
                                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white      gap-5">
                                        
                                                <div className="h-2.5 bg-indigo-50 rounded-full dark:bg-gray-600 w-full mb-2.5"></div> 

                                                </td>
                                            </tr>
   </>
  )
}

export default tableLoadSkelton
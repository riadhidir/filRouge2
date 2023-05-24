import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser , faBuildingColumns, faFile} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";


const Statistics = () => {

   const {auth} = useAuth();

  return (
    <>
 
      <div className="grid grid-cols-1 lg:grid-cols-3  gap-4 mb-4 ">

         <div className="flex ps-10  py-5 flex-col  items-start justify-center gap-2 rounded-lg bg-white shadow-lg  dark:bg-gray-800">
            <FontAwesomeIcon icon={faBuildingColumns} size='3x'/>
            <p className='font-bold text-3xl'>55</p>


            <p className="text-lg text-gray-400 dark:text-gray-500">Universities</p>
         </div>
         <div className="flex ps-10  py-5  flex-col items-start justify-center gap-2 rounded-lg bg-white shadow-lg  dark:bg-gray-800">
            <FontAwesomeIcon icon={faUser} size='3x'/>
            <p className='font-bold text-3xl'>55</p>


            <p className="text-lg text-gray-400 dark:text-gray-500">Users</p>
         </div>
         <div className="flex ps-10  py-5  flex-col items-start justify-center gap-2 rounded-lg bg-white shadow-lg  dark:bg-gray-800">
            <FontAwesomeIcon icon={faFile} size='3x'/>
            <p className='font-bold text-3xl'>55</p>


            <p className="text-lg text-gray-400 dark:text-gray-500">Documents</p>
         </div>

      </div>

{/* 
      <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
         <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4 h-40">
         <div className="flex flex-col ps-10  py-5 text-indigo-900 items-start gap-2 justify-center rounded-lg bg-white  shadow-lg   dark:bg-gray-800 ">
         
            <FontAwesomeIcon icon={faUser} size='3x'/>

            
            <p className='font-bold text-3xl'>55</p>


            <p className="text-lg text-gray-400 dark:text-gray-500">Pending</p>
    
         </div>

         <div className="flex items-center justify-center rounded bg-white  shadow-lg  dark:bg-gray-800 col-span-1 lg:col-span-2">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
         </div>

         
      </div>

    
    </>
  )
}

export default Statistics
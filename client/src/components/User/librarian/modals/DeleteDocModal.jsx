import React, { useEffect, useState } from 'react'
import useFileUpload from '../../../../hooks/useFileUpload';
import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import Loader from '../../../Loader';
import useNotification from '../../../../hooks/useNotification';


const AllDocsDeleteModal = ({show, setShow, data,refetch}) => {
    const notify = useNotification()

    const {deleteFile} = useFileUpload();
    const axiosPrivate = useAxiosPrivate();
    const [deleteStart, setDeleteStart] = useState(false);
    // useEffect(()=>{



    // },[show]);

    const deleteMutation = useMutation(
        async (id) => {
             return await axiosPrivate.delete(`/documents/studentDocs/${id}`);
         },
         {
             onSuccess: () => {
                 refetch();
                 setShow({state:false})
                 setDeleteStart(true)
                 notify('success')

             },
             onError: (error) => {
                 console.error(error.message);
                 notify('error')

             },
         }
     );

    const handleDeleter = async() => {

        try{
          setDeleteStart(true)
        await deleteFile(data?.fileRef);
        deleteMutation.mutate(data?.id);
            }catch(e){
                setDeleteStart(false)
                setShow({state:false})
                notify('error')
    
            }
      
    };
  return (
    <div id="deleteModal" tabIndex="-1" aria-hidden="true" className={`overflow-y-auto overflow-x-hidden ${
        show ? "fixed" : "hidden"
    } top-0 right-0 bg-[#000000a5] left-0 z-50 justify-center items-center w-full md:inset-0 h-[100vh] md:h-full`}>
    <div className="relative p-4 w-full max-w-md h-full md:h-auto mx-auto mt-40 lg:mt-52">
        {/* <!-- Modal content --> */}

        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 ">
                          {/* loader */}
<div className={` ${deleteStart? 'flex':'hidden'} absolute z-50 h-full  w-full bg-[#000000a5] right-0 top-0 rounded-lg  place-content-center place-items-center`}> <Loader/></div>
            <button  onClick={()=>setShow({state:false})} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>
            <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
            <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
            <div className="flex justify-center items-center space-x-4">
                <button onClick={()=>setShow({state:false})} type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                    No, cancel
                </button>
                <button onClick={handleDeleter} className="py-2 px-3 text-sm font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-900">
                    Yes, I'm sure
                </button>
            </div>
        </div>
    </div>
</div>


  )
}

export default AllDocsDeleteModal
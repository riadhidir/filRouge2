import React, { useEffect, useState } from "react";
import useFileUpload from "../../../../hooks/useFileUpload";
import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import Loader from "../../../Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import useNotification from "../../../../hooks/useNotification";


const DeleteAlldocsModal = ({
    mainData,
    refList,
    checkAllRef,
    checkRef,
    checkedCount,
    setCheckedCount,
    refetch,
}) => {
    const notify = useNotification();
    const { deleteFile } = useFileUpload();
    const axiosPrivate = useAxiosPrivate();
    const [deleteStart, setDeleteStart] = useState(false);

    const deleteMutation = useMutation(
        async (data) => {
            return await axiosPrivate.delete(`/documents/teacherDocs`, {data});
        },
        {
            onSuccess: () => {
                checkAllRef.current.checked = false;
                        setCheckedCount(0);
                        checkRef.current.map((item) => {
                            item.checked = false;
                        });
                refetch();
                setCheckedCount(0);
                notify('success');
            },
            onError: (error) => {
                console.error(error.message);
                notify('error');

            },
        }
    );

    const deleteHandler = async () => {
        setDeleteStart(true)
        if (!checkedCount) {
            return "please select a file";
        }
        try{
            const data =  refList.current
            .filter((item) => item.checked)
            .map((item) => item.value);
          
           await Promise.all(mainData.main.map(async(item) => {
                 if (data.includes(item._id) ){
                await deleteFile(item.subject.ref) ;
                await deleteFile(item.answer.ref)}
            }));

            deleteMutation.mutate(data);
        }catch(err){
                console.log(err)
                notify('error');
        setDeleteStart(false);


        }
       
    };

    return (
        <>
       

            <div className=" absolute w-full  flex gap-4 items-center  p-4 top-1/2 left-0 -translate-y-1/2  bg-indigo-500 ">
                <FontAwesomeIcon
                    onClick={() => {
                        checkAllRef.current.checked = false;
                        setCheckedCount(0);
                        checkRef.current.map((item) => {
                            item.checked = false;
                        });

                    }}
                    icon={faTimes}
                    size="2xl"
                    color="white"
                    className="cursor-pointer"
                />

                <p className="w-full md:w-auto     py-2 px-4 text-md font-medium text-white border-r-2  border-white    dark:text-gray-400">
                    {checkedCount} selected
                </p>

                <button
                    onClick={deleteHandler}
                    disabled={!checkedCount}
                    id="actionsDropdownButton"
                    data-dropdown-toggle="actionsDropdown"
                    className="w-full md:w-auto  text-start py-2 px-4 text-md font-medium disabled:bg-gray-300  text-indigo-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    type="button"
                >
                    {/* icon here */}
                    Delete Selected
                </button>
            </div>
            {
                deleteStart &&  <div className="absolute bg-[#000000b8] w-full h-[100vh] right-0 flex place-content-center place-items-center">
                <Loader/>
            </div>
            }
           
        </>
    );
};


export default DeleteAlldocsModal;

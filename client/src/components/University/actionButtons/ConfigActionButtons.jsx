import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faCheck,
    faTimes,
    faArrowRightRotate,
    faPause,
    faEdit,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
const ActionButtons = ({   data , edit ,  toggleState , remove, selectedItem }) => {
    // console.log(data)
    return (
        <>
            <button
                    onClick={() => edit({state:true, id:data._id, previousValue:data.name, fieldID: data?.field, branchID:data?.branch, specialtyID:data?.specialty, cycle:data?.cycle})}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                >
                    <FontAwesomeIcon icon={faEdit} />
                    Edit
                </button>

                <button
                    onClick={() => remove({state:true,selectedItem:selectedItem ,id: data._id})}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                >
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                </button>

            { data.state === "active" ? (
                <button
                    onClick={() => toggleState({id:data._id,state:'disabled'})}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                >
                    <FontAwesomeIcon icon={faPause} />
                    disable
                </button>
            ) : data.state === "disabled" ? (
                <button
                    onClick={() => toggleState({id:data._id,state:'active'})}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                >
                    <FontAwesomeIcon icon={faArrowRightRotate} />
                    Enable
                </button>
            ) : (
                <></>
            )}
        </>
    );
};

export default ActionButtons;

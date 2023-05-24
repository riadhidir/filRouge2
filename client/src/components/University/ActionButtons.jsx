import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faCheck,
    faTimes,
    faArrowRightRotate,
    faPause,
    faEdit
} from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
const ActionButtons = ({   data , edit }) => {
    // console.log(data)
    return (
        <>
            <button
                    onClick={() => edit({state:true, id:data._id, previousValue:data.name, fieldID: data?.field, branchID:data?.branch, specialtyID:data?.special})}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                >
                    <FontAwesomeIcon icon={faEdit} />
                    Edit
                </button>
            { data.state === "active" ? (
                <button
                    onClick={() => suspend(id)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                >
                    <FontAwesomeIcon icon={faPause} />
                    disable
                </button>
            ) : data.state === "diabled" ? (
                <button
                    onClick={() => accept(id)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                >
                    <FontAwesomeIcon icon={faArrowRightRotate} />
                    reactivate
                </button>
            ) : (
                <></>
            )}
        </>
    );
};

export default ActionButtons;

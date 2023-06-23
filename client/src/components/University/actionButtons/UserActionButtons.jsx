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
const ActionButtons = ({   data , edit ,  toggleState , remove }) => {
    // console.log(data)
    return (
        <>
          <Link to={`/users/${data._id}`}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700">
                <FontAwesomeIcon icon={faEye} />
                preview
            </Link>
            <button
                    onClick={() => edit({state:true, id:data._id, f_name:data.f_name, l_name: data?.l_name, email:data?.email, phone:data?.phone})}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                >
                    <FontAwesomeIcon icon={faEdit} />
                    Edit
                </button>

                <button
                    onClick={() => remove(data._id)}
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

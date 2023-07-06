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
        <div className="flex gap-5 ">
          {/* <Link to={`/users/${data._id}`}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700">
                <FontAwesomeIcon icon={faEye} />
                preview
            </Link> */}
            <button
              
                    onClick={() => edit({state:true,title:data?.title, id:data?._id, specialty:data?.specialty, type: data?.type, language:data?.language, date:data?.date, file:data?.link, cycle:data?.cycle, description:data?.description})}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                >
                    <FontAwesomeIcon icon={faEdit} />
                    Edit
                </button>

                <button
                    onClick={() => remove({state:true, id:data._id, fileRef:data?.link?.ref})}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                >
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                </button>

            { data.state === "active" ? (
                <button
                    onClick={() => toggleState({id:data._id,state:'archived'})}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                >
                    <FontAwesomeIcon icon={faPause} />
                    Archive
                </button>
            ) : data.state === "archived" ? (
                <button
                    onClick={() => toggleState({id:data._id,state:'active'})}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                >
                    <FontAwesomeIcon icon={faArrowRightRotate} />
                    Activate
                </button>
            ) : (
                <></>
            )}
        </div>
    );
};

export default ActionButtons;

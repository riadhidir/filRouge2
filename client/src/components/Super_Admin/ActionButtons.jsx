import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faCheck,
    faTimes,
    faArrowRightRotate,
    faPause,
} from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
const ActionButtons = ({ state, id, accept, refuse, suspend }) => {
    return (
        <>
            <Link to={id}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700">
                <FontAwesomeIcon icon={faEye} />
                preview
            </Link>
            {state === "pending" ? (
                <>
                    <button
                        onClick={() => accept(id)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                    >
                        <FontAwesomeIcon icon={faCheck} />
                        Accept
                    </button>

                    <button
                        onClick={() => refuse(id)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                        refuse
                    </button>
                </>
            ) : state === "active" ? (
                <button
                    onClick={() => suspend(id)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                >
                    <FontAwesomeIcon icon={faPause} />
                    Suspend
                </button>
            ) : state === "suspended" ? (
                <button
                    onClick={() => accept(id)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                >
                    <FontAwesomeIcon icon={faArrowRightRotate} />
                    Unsuspend
                </button>
            ) : (
                <></>
            )}
        </>
    );
};

export default ActionButtons;

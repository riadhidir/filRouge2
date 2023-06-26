import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SuccessNotification = () => (
    <div>
      <h4>Operation Successful.</h4>
      {/* <p>Operation Successful.</p> */}
    </div>
  );
  
  const ErrorNotification = () => (
    <div>
      <h4>Error! Try again later</h4>
      {/* <p>Try again later</p> */}
    </div>
  );
  
  const WarningNotification = () => (
    <div>
      <h4>Warning!</h4>
      <p>This is a warning notification.</p>
    </div>
  );
  
const useNotification = () => {
    const notify = (state) => {
        switch (state) {
            case 'success':
              toast.success(<SuccessNotification/>, { position: toast.POSITION.BOTTOM_RIGHT });
              break;
            case 'error':
              toast.error(<ErrorNotification/>, { position: toast.POSITION.BOTTOM_RIGHT });
              break;
            case 'warning':
              toast.warn('Warning message!', { position: toast.POSITION.BOTTOM_RIGHT });
              break;
            default:
              toast('Default message!', { position: toast.POSITION.BOTTOM_RIGHT });
          }
    }
    
    
  return notify;
    
}

export default useNotification
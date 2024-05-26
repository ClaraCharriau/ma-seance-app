import { Slide, ToastContainer } from 'react-toastify';

const Toast = () => {
    return (
        <ToastContainer position="bottom-center" autoClose={3000} transition={Slide} limit={3} className={'toast'} />
    );
};

export default Toast;

import { Slide, ToastContainer } from 'react-toastify';

const Toast = () => {
    return <ToastContainer autoClose={5000} transition={Slide} limit={3} className={'toast'} />;
};

export default Toast;

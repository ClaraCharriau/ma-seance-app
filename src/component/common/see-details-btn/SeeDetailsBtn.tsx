import { useNavigate } from 'react-router-dom';
import style from './SeeDetails.module.css';

interface SeeDetailsBtnProps {
    text: string;
    navigatePath: string;
}

const SeeDetailsBtn = (props: SeeDetailsBtnProps) => {
    const { text, navigatePath } = props;
    const navigate = useNavigate();

    return (
        <button className={style.seeDetailsBtn} onClick={() => navigate(navigatePath)}>
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1079_753)">
                    <path
                        d="M9.5 19C11.3789 19 13.2156 18.4428 14.7779 17.399C16.3402 16.3551 17.5578 14.8714 18.2769 13.1355C18.9959 11.3996 19.184 9.48946 18.8175 7.64664C18.4509 5.80382 17.5461 4.11108 16.2175 2.78249C14.8889 1.45389 13.1962 0.549099 11.3534 0.182541C9.51053 -0.184019 7.6004 0.00411224 5.8645 0.723145C4.1286 1.44218 2.64491 2.65981 1.60103 4.22208C0.557159 5.78435 -3.8147e-06 7.62108 -3.8147e-06 9.5C0.00274658 12.0187 1.00452 14.4335 2.78552 16.2145C4.56652 17.9955 6.98128 18.9972 9.5 19ZM9.5 0.890625C11.2028 0.890625 12.8673 1.39556 14.2831 2.34157C15.6989 3.28758 16.8024 4.63218 17.454 6.20533C18.1056 7.77849 18.2761 9.50955 17.9439 11.1796C17.6117 12.8497 16.7918 14.3837 15.5877 15.5877C14.3837 16.7918 12.8497 17.6118 11.1796 17.9439C9.50955 18.2761 7.77849 18.1056 6.20533 17.454C4.63217 16.8024 3.28757 15.6989 2.34156 14.2831C1.39555 12.8673 0.890621 11.2028 0.890621 9.5C0.89337 7.2175 1.80131 5.02927 3.41529 3.41529C5.02926 1.80132 7.21749 0.893375 9.5 0.890625Z"
                        fill="white"
                    />
                    <path
                        d="M7.99781 13.6741C8.0813 13.7575 8.19449 13.8043 8.3125 13.8043C8.4305 13.8043 8.54369 13.7575 8.62718 13.6741L12.4866 9.81471C12.5699 9.73122 12.6168 9.61803 12.6168 9.50003C12.6168 9.38202 12.5699 9.26883 12.4866 9.18534L8.62718 5.32596C8.54277 5.2473 8.43111 5.20448 8.31575 5.20652C8.20038 5.20855 8.09031 5.25529 8.00872 5.33687C7.92713 5.41846 7.8804 5.52854 7.87836 5.6439C7.87633 5.75927 7.91915 5.87092 7.99781 5.95534L11.5425 9.50003L7.99781 13.0447C7.91442 13.1282 7.86757 13.2414 7.86757 13.3594C7.86757 13.4774 7.91442 13.5906 7.99781 13.6741Z"
                        fill="white"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_1079_753">
                        <rect width="19" height="19" fill="white" transform="matrix(-1 0 0 -1 19 19)" />
                    </clipPath>
                </defs>
            </svg>
            {text}
        </button>
    );
};

export default SeeDetailsBtn;
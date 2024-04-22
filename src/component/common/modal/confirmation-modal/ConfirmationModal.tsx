import ReactModal from 'react-modal';
import style from '../Modal.module.css';

ReactModal.setAppElement('body');

interface ConfirmationModalProps {
    confirmationText: string;
    leftButtonText?: string;
    leftButtonCallback: () => void;
    rightButtonText?: string;
    rightButtonCallback: () => void;
    openModal: boolean;
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
    const {
        confirmationText,
        leftButtonText = 'confirmer',
        rightButtonText = 'annuler',
        openModal,
        leftButtonCallback,
        rightButtonCallback
    } = props;

    return (
        <ReactModal
            isOpen={openModal}
            className={style.confirmationModal}
            overlayClassName={style.overlay}
            ariaHideApp={false}
        >
            <div className={style.rowWrapper}>
                <svg width="40" height="40" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15.4997 0.915283C23.5551 0.915283 30.0852 7.44548 30.0852 15.5009C30.0852 23.5563 23.5551 30.0864 15.4997 30.0864C7.44426 30.0864 0.914062 23.5563 0.914062 15.5009C0.914062 7.44548 7.44426 0.915283 15.4997 0.915283ZM15.4997 3.10278C8.65239 3.10278 3.10156 8.65361 3.10156 15.5009C3.10156 22.3482 8.65239 27.8989 15.4997 27.8989C22.3469 27.8989 27.8977 22.3482 27.8977 15.5009C27.8977 8.65361 22.3469 3.10278 15.4997 3.10278ZM15.4943 13.312C16.048 13.3117 16.506 13.7228 16.5787 14.2565L16.5888 14.405L16.594 22.4282C16.5945 23.0322 16.1051 23.5222 15.501 23.5226C14.9473 23.5229 14.4894 23.1118 14.4166 22.5781L14.4065 22.4296L14.4013 14.4064C14.4009 13.8024 14.8903 13.3124 15.4943 13.312ZM15.5003 8.21106C16.3047 8.21106 16.9567 8.86311 16.9567 9.66744C16.9567 10.4718 16.3047 11.1238 15.5003 11.1238C14.696 11.1238 14.0439 10.4718 14.0439 9.66744C14.0439 8.86311 14.696 8.21106 15.5003 8.21106Z"
                        fill="#FFF1A7"
                    />
                </svg>
                <p className={style.confirmationText}>{confirmationText}</p>
            </div>
            <div className={style.buttonWrapper}>
                <button className={style.leftButton} onClick={leftButtonCallback}>
                    {leftButtonText}
                </button>
                <button className={style.rightButton} onClick={rightButtonCallback}>
                    {rightButtonText}
                </button>
            </div>
        </ReactModal>
    );
};

export default ConfirmationModal;

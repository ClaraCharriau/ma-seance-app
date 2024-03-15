import ReactModal from 'react-modal';
import { Showtime } from '../../../../models/Showtime';
import style from '../Modal.module.css';

ReactModal.setAppElement('body');

interface ShowtimeModalProps {
    showtime: Showtime;
    openModal: boolean;
    bookmarkCallback: () => void;
}

const ShowtimeModal = (props: ShowtimeModalProps) => {
    const { openModal, showtime, bookmarkCallback } = props;
    const { schedule, movie, theater } = showtime;

    // const buildShowtime = (screeningDate: ScreeningDate, movie: Movie, theater: Theater): Showtime => {
    //     return new Showtime(screeningDate, movie, theater);
    // };

    return (
        <ReactModal
            isOpen={openModal}
            className={style.confirmationModal}
            overlayClassName={style.overlay}
            ariaHideApp={false}
        >
            <div>
                <p>{movie.title}</p>
                <p>{theater.name}</p>
                <p>{schedule.date}</p>
            </div>
            <button onClick={() => bookmarkCallback()}>Ajouter à l'agenda</button>
            <button>Partager cette séance</button>
        </ReactModal>
    );
};

export default ShowtimeModal;

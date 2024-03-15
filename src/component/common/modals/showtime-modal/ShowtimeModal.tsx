import ReactModal from 'react-modal';
import { Movie } from '../../../../models/Movie';
import { ScreeningDate } from '../../../../models/ScreeningDate';
import { Showtime } from '../../../../models/Showtime';
import { Theater } from '../../../../models/Theater';
import style from '../Modal.module.css';
import { useAgendaContext } from '../../../../context/agenda.context';

ReactModal.setAppElement('body');

interface ShowtimeModalProps {
    screeningDate: ScreeningDate;
    theater: Theater;
    movie: Movie;
    openModal: boolean;
    closeModal: () => void;
}

const ShowtimeModal = (props: ShowtimeModalProps) => {
    const { openModal, theater, movie, screeningDate, closeModal } = props;
    const { updateAgenda } = useAgendaContext();

    const buildShowtime = (screeningDate: ScreeningDate, movie: Movie, theater: Theater): Showtime => {
        return new Showtime(screeningDate, movie, theater);
    };

    const addShowtimeToUserAgenda = (screeningDate: ScreeningDate, movie: Movie, theater: Theater) => {
        const showtime = buildShowtime(screeningDate, movie, theater);
        updateAgenda(showtime);
        closeModal();
    };

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
                <p>{screeningDate.date}</p>
            </div>
            <button
                onClick={() => {
                    addShowtimeToUserAgenda(screeningDate, movie, theater);
                }}
            >
                Ajouter à l'agenda
            </button>
            <button>Annuler</button>
        </ReactModal>
    );
};

export default ShowtimeModal;

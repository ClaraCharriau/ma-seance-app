import ReactModal from 'react-modal';
import { Movie } from '../../../../models/Movie';
import { ScreeningDate } from '../../../../models/ScreeningDate';
import { Showtime } from '../../../../models/Showtime';
import { Theater } from '../../../../models/Theater';
import styleModal from '../Modal.module.css';
import { useAgendaContext } from '../../../../context/agenda.context';
import { ShowtimeModalInfos } from './showtime-modal-infos/ShowtimeModalInfos';
import style from './ShowtimeModale.module.css';

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
            className={styleModal.confirmationModal}
            overlayClassName={styleModal.overlay}
            ariaHideApp={false}
        >
            <ShowtimeModalInfos movie={movie} theater={theater} screeningDate={screeningDate} />
            <button
                className={style.addToAgendaBtn}
                onClick={() => {
                    addShowtimeToUserAgenda(screeningDate, movie, theater);
                }}
            >
                Ajouter à l'agenda
            </button>
            <button className={style.cancelBtn} onClick={closeModal}>
                Annuler
            </button>
        </ReactModal>
    );
};

export default ShowtimeModal;

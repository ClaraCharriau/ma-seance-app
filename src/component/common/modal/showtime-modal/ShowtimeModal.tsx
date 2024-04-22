import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
import { useAgendaContext } from '../../../../context/agenda.context';
import { Movie } from '../../../../model/Movie';
import { ScreeningDate } from '../../../../model/ScreeningDate';
import { Showtime } from '../../../../model/Showtime';
import { Theater } from '../../../../model/Theater';
import { ShowtimeDetails } from '../../showtime-details/ShowtimeDetails';
import styleModal from '../Modal.module.css';
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

    const addShowtimeToUserAgenda = async (screeningDate: ScreeningDate, movie: Movie, theater: Theater) => {
        const showtime = buildShowtime(screeningDate, movie, theater);
        try {
            await updateAgenda(showtime);
            toast.success(`La séance de ${showtime.movie.title} a été ajoutée à l'agenda`);
        } catch (error: any) {
            console.error('An error occured');
        }
        closeModal();
    };

    return (
        <ReactModal
            isOpen={openModal}
            className={styleModal.confirmationModal}
            overlayClassName={styleModal.overlay}
            ariaHideApp={false}
        >
            <ShowtimeDetails movie={movie} theater={theater} screeningDate={screeningDate} />
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

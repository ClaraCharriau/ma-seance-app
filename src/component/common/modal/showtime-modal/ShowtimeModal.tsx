import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
import { useAgendaContext } from '../../../../context/agenda.context';
import { Movie } from '../../../../model/Movie';
import { Screening } from '../../../../model/Screening';
import { ScreeningDate } from '../../../../model/ScreeningDate';
import { Theater } from '../../../../model/Theater';
import { ShowtimeDetails } from '../../showtime-details/ShowtimeDetails';
import styleModal from '../Modal.module.css';
import style from './ShowtimeModale.module.css';

ReactModal.setAppElement('body');

interface ShowtimeModalProps {
    screeningId: string;
    screeningDate: ScreeningDate;
    theater: Theater;
    movie: Movie;
    openModal: boolean;
    closeModal: () => void;
}

const ShowtimeModal = (props: ShowtimeModalProps) => {
    const { screeningId, openModal, theater, movie, screeningDate, closeModal } = props;
    const { updateAgenda, refreshAgenda } = useAgendaContext();

    const buildScreening = (id: string, screeningDate: ScreeningDate, movie: Movie, theater: Theater): Screening => {
        return new Screening(id, screeningDate, movie, theater);
    };

    const addScreeningToUserAgenda = async (
        id: string,
        screeningDate: ScreeningDate,
        movie: Movie,
        theater: Theater
    ) => {
        const screening = buildScreening(id, screeningDate, movie, theater);
        try {
            updateAgenda(screening);
            toast.success(`La séance de ${screening.movie.title} a été ajoutée à l'agenda`);
            refreshAgenda();
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
                    addScreeningToUserAgenda(screeningId, screeningDate, movie, theater);
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

import { useAgendaContext } from '../../../context/agenda.context';
import ShowtimeCard from '../../common/showtime-card/ShowtimeCard';
import style from './NextShowtimesList.module.css';

const NextShowtimesList = () => {
    const { showtimes } = useAgendaContext();

    return (
        <div className={style.showtimesList}>
            {showtimes.slice(0, 3).map(show => (
                <ShowtimeCard showtime={show} key={show.id} />
            ))}
        </div>
    );
};

export default NextShowtimesList;

import { useEffect, useState } from 'react';
import { useAgendaContext } from '../../../context/agenda.context';
import { Showtime } from '../../../model/Showtime';
import ShowtimeCard from '../../common/showtime-card/ShowtimeCard';
import style from './NextShowtimesList.module.css';
import Spinner from '../../common/spinner/Spinner';

const NextShowtimesList = () => {
    const { showtimes } = useAgendaContext();
    const [nextShowtimes, setNextShowtimes] = useState<Showtime[]>([]);
    const today = new Date();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const ERROR_MESSAGE = "Une erreur s'est produite lors du chargement des séances. Veuillez réessayer.";

    useEffect(() => {
        const timeout = setTimeout(() => {
            setError(ERROR_MESSAGE);
            setLoading(false);
        }, 5000);

        const userNextShowtimes = getUserNextShowtimes();

        setNextShowtimes(userNextShowtimes);
        setLoading(false);
        clearTimeout(timeout);
        // eslint-disable-next-line
    }, [showtimes]);

    const getUserNextShowtimes = (): Showtime[] => {
        return showtimes.filter(showtime => new Date(showtime.schedule.date) > today);
    };

    return loading ? (
        <Spinner />
    ) : error ? (
        <div className={style.error}>{error}</div>
    ) : (
        <div className={style.showtimesList}>
            {nextShowtimes.slice(0, 3).map(show => (
                <ShowtimeCard showtime={show} key={show.id} />
            ))}
        </div>
    );
};

export default NextShowtimesList;

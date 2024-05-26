import { useEffect, useState } from 'react';
import { useAgendaContext } from '../../../context/agenda.context';
import { Screening } from '../../../model/Screening';
import ShowtimeCard from '../../common/showtime-card/ShowtimeCard';
import Spinner from '../../common/spinner/Spinner';
import style from './NextScreeningsList.module.css';

const NextScreeningsList = () => {
    const { screenings } = useAgendaContext();
    const [nextScreenings, setNextScreenings] = useState<Screening[]>([]);
    const today = new Date();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const ERROR_MESSAGE = "Une erreur s'est produite lors du chargement des séances. Veuillez réessayer.";

    useEffect(() => {
        const timeout = setTimeout(() => {
            setError(ERROR_MESSAGE);
            setLoading(false);
        }, 5000);

        const userNextShowtimes = getUserNextScreenings();

        setNextScreenings(userNextShowtimes);
        setLoading(false);
        clearTimeout(timeout);
        // eslint-disable-next-line
    }, [screenings]);

    const getUserNextScreenings = (): Screening[] => {
        return screenings.filter(screening => new Date(screening.schedule.date) > today);
    };

    return loading ? (
        <Spinner />
    ) : error ? (
        <div className={style.error}>{error}</div>
    ) : (
        <div className={style.screeningsList}>
            {nextScreenings.slice(0, 3).map(show => (
                <ShowtimeCard screening={show} key={show.id} />
            ))}
        </div>
    );
};

export default NextScreeningsList;

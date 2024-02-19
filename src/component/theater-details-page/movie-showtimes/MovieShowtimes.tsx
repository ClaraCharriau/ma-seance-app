import MovieSummary from '../movie-summary/MovieSummary';
import { MovieScreenings } from '../../../models/MovieScreenings';
import TimeSlot from '../../common/time-slot/TimeSlot';
import style from './MovieShowtimes.module.css';
import { NavLink, useLoaderData } from 'react-router-dom';

const MovieShowtimes = () => {
    const showtimes = useLoaderData() as MovieScreenings[];

    return (
        <section className={style.showtimesSection}>
            {showtimes.map(showtimes => (
                <div key={showtimes.movie.id} className={style.movieShowtimesWrapper}>
                    {/* MOVIE DETAILS */}
                    <MovieSummary movie={showtimes.movie} />

                    {/* TIME SLOTS */}
                    <div className={style.timeSlotColumn}>
                        <p className={style.timeSlotTitle}>Horaires</p>
                        <div className={style.timeSlotWrapper}>
                            {showtimes.schedule.map(time => (
                                <TimeSlot key={time} time={time} />
                            ))}
                        </div>
                        <NavLink to={`/movies/${showtimes.movie.id}`}>{"Voir d'autres séances pour ce film >"}</NavLink>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default MovieShowtimes;

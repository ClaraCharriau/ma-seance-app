import MovieSummary from '../movie-summary/MovieSummary';
import { MovieScreenings } from '../../../models/MovieScreenings';
import style from './MoviesScreeningsList.module.css';
import { useLoaderData } from 'react-router-dom';

const MoviesScreeningsList = () => {
    const showtimes = useLoaderData() as MovieScreenings[];

    return (
        <section className={style.showtimesSection}>
            {showtimes.map(showtimes => (
                <MovieSummary key={showtimes.movie.id} movie={showtimes.movie} schedule={showtimes.schedule} />
            ))}
        </section>
    );
};

export default MoviesScreeningsList;

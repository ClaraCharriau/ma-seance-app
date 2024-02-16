import { NavLink } from 'react-router-dom';
import { Movie } from '../../../models/Movie';
import style from './MovieListCard.module.css';
import useDurationFormat from '../../../hooks/useDurationFormat';
import useDateFormat from '../../../hooks/useDateFormat';
import useStringListFormat from '../../../hooks/useStringListFormat';

interface MovieListCardProps {
    movie: Movie;
}

const MovieListCard = (props: MovieListCardProps) => {
    const { movie } = props;
    const TMDB_PATH = 'https://image.tmdb.org/t/p/w1280';

    const formattedDuration = useDurationFormat(movie.duration);
    const formattedReleaseDate = useDateFormat(movie.releaseDate);
    const directors = useStringListFormat(movie.directors);
    const cast = useStringListFormat(movie.cast);

    return (
        <NavLink to={`/movies/${movie.id}`} state={{ id: movie.id }} className={style.movieCard}>
            <img
                src={TMDB_PATH + movie.posterLink}
                alt={`affiche du film ${movie.title}`}
                className={style.movieCardImg}
            />
            <div>
                <p className={style.movieTitle}>{movie.title}</p>
                <p className={style.movieDateDuration}>
                    {formattedReleaseDate} - {formattedDuration}
                </p>
                <p className={style.movieDirector}>Réalisé par {directors}</p>
                <p className={style.movieCast}>Avec {cast}</p>
            </div>
        </NavLink>
    );
};

export default MovieListCard;

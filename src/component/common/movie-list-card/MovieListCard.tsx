import { NavLink } from 'react-router-dom';
import { Movie } from '../../../models/Movie';
import style from './MovieListCard.module.css';
import useDurationFormat from '../../../hooks/useDurationFormat';
import useDateDMYFormat from '../../../hooks/dates/useDateDMYFormat';
import useStringListFormat from '../../../hooks/useStringListFormat';
import config from '../../../config/config.helper';

interface MovieListCardProps {
    movie: Movie;
}

const MovieListCard = (props: MovieListCardProps) => {
    const { movie } = props;
    const TMDB_PATH = config.tmdbImgPath.medium;
    const formattedDuration = useDurationFormat(movie.duration);
    const formattedReleaseDate = useDateDMYFormat(movie.releaseDate);
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

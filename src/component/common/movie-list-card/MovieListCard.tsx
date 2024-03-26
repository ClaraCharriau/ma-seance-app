import { NavLink } from 'react-router-dom';
import config from '../../../config/config.helper';
import { useYearFromDate } from '../../../hook/date-hook/date.hook';
import { useTextDuration, useTextList } from '../../../hook/string-hook/string.hook';
import { Movie } from '../../../models/Movie';
import style from './MovieListCard.module.css';

interface MovieListCardProps {
    movie: Movie;
}

const MovieListCard = (props: MovieListCardProps) => {
    const { movie } = props;
    const TMDB_PATH = config.tmdbImgPath.medium;
    const duration = useTextDuration(movie.duration);
    const releaseDate = useYearFromDate(movie.releaseDate);
    const directors = useTextList(movie.directors);
    const cast = useTextList(movie.cast);

    return (
        <NavLink to={`/movies/${movie.id}/day-1`} state={{ movie }} className={style.movieCard}>
            <img
                src={TMDB_PATH + movie.posterLink}
                alt={`affiche du film ${movie.title}`}
                className={style.movieCardImg}
            />
            <div>
                <p className={style.movieTitle}>{movie.title}</p>
                <p className={style.movieDateDuration}>
                    {releaseDate} - {duration}
                </p>
                <p className={style.movieDirector}>Réalisé par {directors}</p>
                <p className={style.movieCast}>Avec {cast}</p>
            </div>
        </NavLink>
    );
};

export default MovieListCard;

import { NavLink } from 'react-router-dom';
import { Movie } from '../../../models/Movie';
import style from './MovieCard.module.css';
import config from '../../../config/config.helper';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard = (props: MovieCardProps) => {
    const { movie } = props;
    const TMDB_PATH = config.tmdbImgPath.large;

    return (
        <NavLink to={`/movies/${movie.id}/day-1`} state={{ movie }} className={style.card}>
            <img
                className={style.movieCardImg}
                src={TMDB_PATH + movie.posterLink}
                alt={'Affiche du film ' + movie.title}
            />
        </NavLink>
    );
};

export default MovieCard;

import { NavLink } from 'react-router-dom';
import { Movie } from '../../../models/Movie';
import style from './MovieCard.module.css';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard = (props: MovieCardProps) => {
    const { movie } = props;
    const TMDB_PATH = 'https://image.tmdb.org/t/p/w1280';

    return (
        <NavLink to={`/movies/${movie.id}`} state={{ id: movie.id }} className={style.card}>
            <img
                className={style.movieCardImg}
                src={TMDB_PATH + movie.posterLink}
                alt={'Affiche du film ' + movie.title}
            />
        </NavLink>
    );
};

export default MovieCard;

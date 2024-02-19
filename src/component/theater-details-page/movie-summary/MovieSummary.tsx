import { Movie } from '../../../models/Movie';
import style from './MovieSummary.module.css';

interface MovieSummaryProps {
    movie: Movie;
}

const MovieSummary = (props: MovieSummaryProps) => {
    const { movie } = props;
    return (
        <div className={style.movieSummaryWrapper}>
            <p>{movie.title}</p>
        </div>
    );
};

export default MovieSummary;

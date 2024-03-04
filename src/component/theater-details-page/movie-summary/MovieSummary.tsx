import config from '../../../config/config.helper';
import useDateDMYFormat from '../../../hooks/dates/useDateDMYFormat';
import useDurationFormat from '../../../hooks/useDurationFormat';
import useStringListFormat from '../../../hooks/useStringListFormat';
import { Movie } from '../../../models/Movie';
import style from './MovieSummary.module.css';

interface MovieSummaryProps {
    movie: Movie;
}

const MovieSummary = (props: MovieSummaryProps) => {
    const { movie } = props;
    const TMDB_PATH = config.tmdbImgPath.medium;
    const formattedDuration = useDurationFormat(movie.duration);
    const formattedReleaseDate = useDateDMYFormat(movie.releaseDate);
    const directors = useStringListFormat(movie.directors);
    const cast = useStringListFormat(movie.cast);

    return (
        <div className={style.movieSummaryWrapper}>
            <img src={TMDB_PATH + movie.posterLink} alt={'photo de ' + movie.title} />
            <div className={style.movieInfos}>
                <p>{movie.title}</p>
                <p>De {directors}</p>
                <p>Avec {cast}</p>
                <p>
                    {formattedDuration} ● Sorti le {formattedReleaseDate}
                </p>
                <p>{movie.resume}</p>
            </div>
        </div>
    );
};

export default MovieSummary;

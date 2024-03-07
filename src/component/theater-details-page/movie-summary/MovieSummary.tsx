import { Link, NavLink } from 'react-router-dom';
import config from '../../../config/config.helper';
import useDateDMYFormat from '../../../hooks/dates/useDateDMYFormat';
import useDurationFormat from '../../../hooks/useDurationFormat';
import useStringListFormat from '../../../hooks/useStringListFormat';
import { Movie } from '../../../models/Movie';
import style from './MovieSummary.module.css';
import TimeSlotsList from '../../common/time-slots-list/TimeSlotsList';

interface MovieSummaryProps {
    movie: Movie;
    schedule: string[];
}

const MovieSummary = (props: MovieSummaryProps) => {
    const { movie, schedule } = props;
    const TMDB_PATH = config.tmdbImgPath.medium;
    const formattedDuration = useDurationFormat(movie.duration);
    const formattedReleaseDate = useDateDMYFormat(movie.releaseDate);
    const directors = useStringListFormat(movie.directors);
    const cast = useStringListFormat(movie.cast);
    const movieLink = '/movies/' + movie.id + '/day-1';

    return (
        <div className={style.movieSummaryWrapper}>
            {/* Movie poster */}
            <Link to={movieLink}>
                <img src={TMDB_PATH + movie.posterLink} alt={'photo de ' + movie.title} />
            </Link>

            {/* Movie infos */}
            <div className={style.movieInfosWrapper}>
                <div className={style.movieInfos}>
                    <Link to={movieLink}>
                        <p className={style.movieTitle}>{movie.title}</p>
                    </Link>
                    <p className={style.movieDirectors}>De {directors}</p>
                    <p className={style.movieCast}>Avec {cast}</p>
                    <p className={style.movieDuration}>
                        {formattedDuration} ● Sorti le {formattedReleaseDate}
                    </p>
                    <p className={style.movieResume}>{movie.resume}</p>
                </div>

                {/* Movie schedule */}
                <div className={style.timeSlotColumn}>
                    <p className={style.timeSlotTitle}>Horaires</p>
                    <TimeSlotsList schedule={schedule} />
                    <NavLink to={movieLink}>{"Voir d'autres séances pour ce film >"}</NavLink>
                </div>
            </div>
        </div>
    );
};

export default MovieSummary;

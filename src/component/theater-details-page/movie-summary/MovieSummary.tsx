import { Link, NavLink } from 'react-router-dom';
import config from '../../../config/config.helper';
import { useTextDate } from '../../../hook/date-hook/date.hook';
import { useTextDuration, useTextList } from '../../../hook/string-hook/string.hook';
import { Movie } from '../../../model/Movie';
import { ScreeningDate } from '../../../model/ScreeningDate';
import { Theater } from '../../../model/Theater';
import TimeSlotsList from '../../common/time-slots-list/TimeSlotsList';
import style from './MovieSummary.module.css';

interface MovieSummaryProps {
    movie: Movie;
    theater: Theater;
    schedule: ScreeningDate[];
}

const MovieSummary = (props: MovieSummaryProps) => {
    const { movie, schedule, theater } = props;
    const TMDB_PATH = config.tmdbimagePath.medium;
    const duration = useTextDuration(movie.duration);
    const releaseDate = useTextDate(movie.releaseDate);
    const directors = useTextList(movie.directors);
    const cast = useTextList(movie.cast);
    const movieLink = '/movies/' + movie.id + '/day-1';

    return (
        <div className={style.movieSummaryWrapper}>
            {/* Movie poster */}
            <Link to={movieLink} state={{ movie }}>
                <img src={TMDB_PATH + movie.posterLink} alt={'photo de ' + movie.title} />
            </Link>

            {/* Movie infos */}
            <div className={style.movieInfosWrapper}>
                <div className={style.movieInfos}>
                    <Link to={movieLink} state={{ movie }}>
                        <p className={style.movieTitle}>{movie.title}</p>
                    </Link>
                    <p className={style.movieDirectors}>De {directors}</p>
                    <p className={style.movieCast}>Avec {cast}</p>
                    <p className={style.movieDuration}>
                        {duration} ● Sorti le {releaseDate}
                    </p>
                    <p className={style.movieResume}>{movie.resume}</p>
                </div>

                {/* Movie schedule */}
                <div className={style.timeSlotColumn}>
                    <p className={style.timeSlotTitle}>Horaires</p>
                    <TimeSlotsList screeningDateList={schedule} theater={theater} movie={movie} />
                    <NavLink to={movieLink} state={{ movie }}>
                        {"Voir d'autres séances pour ce film >"}
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default MovieSummary;

import { Link, NavLink } from 'react-router-dom';
import config from '../../../config/config.helper';
import { Movie } from '../../../models/Movie';
import style from './MovieSummary.module.css';
import TimeSlotsList from '../../common/time-slots-list/TimeSlotsList';
import { ScreeningDate } from '../../../models/ScreeningDate';
import { Theater } from '../../../models/Theater';
import { useTextDuration, useTextList } from '../../../hook/string-hook/string.hook';
import { useTextDate } from '../../../hook/date-hook/date.hook';

interface MovieSummaryProps {
    movie: Movie;
    theater: Theater;
    schedule: ScreeningDate[];
}

const MovieSummary = (props: MovieSummaryProps) => {
    const { movie, schedule, theater } = props;
    const TMDB_PATH = config.tmdbImgPath.medium;
    const duration = useTextDuration(movie.duration);
    const releaseDate = useTextDate(movie.releaseDate);
    const directors = useTextList(movie.directors);
    const cast = useTextList(movie.cast);
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
                        {duration} ● Sorti le {releaseDate}
                    </p>
                    <p className={style.movieResume}>{movie.resume}</p>
                </div>

                {/* Movie schedule */}
                <div className={style.timeSlotColumn}>
                    <p className={style.timeSlotTitle}>Horaires</p>
                    <TimeSlotsList screeningDateList={schedule} theater={theater} movie={movie} />
                    <NavLink to={movieLink}>{"Voir d'autres séances pour ce film >"}</NavLink>
                </div>
            </div>
        </div>
    );
};

export default MovieSummary;

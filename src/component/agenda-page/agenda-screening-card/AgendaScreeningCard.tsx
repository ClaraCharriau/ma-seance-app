import { Screening } from '../../../model/Screening';
import MovieListCard from '../../common/movie-list-card/MovieListCard';
import SeeDetailsBtn from '../../common/see-details-btn/SeeDetailsBtn';
import style from './AgendaScreeningCard.module.css';

type AgendaScreeningCardProps = {
    screening: Screening;
};

const AgendaScreeningCard = (props: AgendaScreeningCardProps) => {
    const { screening } = props;
    const { id, schedule, theater, movie } = screening;
    const { dayName, dayNumber, month, hourly } = schedule;

    return (
        <div className={style.showtimeCardWrapper}>
            <p className={style.calendarDate}>
                <svg className={style.calendarFrame} viewBox="0 0 49 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M37.7211 4.21515V0.921757C37.727 0.732429 37.7481 0.68071 37.7896 0.58189C37.9722 0.146896 38.6608 -0.00318148 38.7611 5.09622e-05C38.9495 0.0166749 38.9794 0.032837 39.0601 0.0628525C39.4267 0.2 39.663 0.461828 39.6787 0.921757V4.22531C40.0369 4.22716 40.3952 4.22946 40.7534 4.23131C45.0292 4.30612 48.8866 7.78607 48.9689 11.9836C49.0383 22.176 48.9698 40.9333 48.9698 51.1256C48.9419 55.1985 45.292 58.8932 40.7529 58.9726C29.9515 59.034 19.1492 58.973 8.34727 58.973C4.0225 58.9481 0.113721 55.4395 0.0310135 51.2203C-0.0384804 41.0279 0.0305243 22.2706 0.0305243 12.0778C0.0579304 8.00172 3.74795 4.30981 8.24646 4.23131C9.09898 4.22623 9.9515 4.22161 10.8045 4.21746V0.921757C10.8104 0.743511 10.8256 0.713958 10.852 0.636379C11.013 0.169061 11.7427 -0.00318148 11.8445 5.09622e-05C12.0329 0.0166749 12.0627 0.032837 12.1435 0.0628525C12.51 0.2 12.7464 0.461828 12.7621 0.921757V4.20868C21.0813 4.17313 29.4015 4.17544 37.7211 4.21515ZM37.7211 6.06364C29.4015 6.03178 21.0818 6.0641 12.7621 6.07472V10.1573C12.7342 10.9917 12.467 10.9746 11.9663 11.0647C11.4035 11.1658 10.8236 10.7304 10.8045 10.1573V6.07703C9.98723 6.07749 9.16994 6.07796 8.35314 6.07796C5.04093 6.09735 2.05123 8.79736 1.98859 12.0062C1.9186 22.2152 1.9186 40.9887 1.98859 51.1972C2.04878 54.2814 4.85153 57.0654 8.27092 57.1255C19.0899 57.1869 29.9099 57.1869 40.7289 57.1255C44.0025 57.0682 46.9486 54.4061 47.0113 51.1972C47.0813 40.9887 47.0813 22.2152 47.0113 12.0062C46.9511 8.93035 44.1689 6.13845 40.7289 6.07842C40.379 6.07611 40.0286 6.07426 39.6787 6.07241V10.1573C39.6562 10.8186 39.4506 10.8213 39.1712 10.9668C38.5844 11.2711 37.7441 10.8532 37.7211 10.1573V6.06364Z"
                        fill="#FAB32D"
                    />
                </svg>
                <span>{dayName}</span>
                <span>{dayNumber}</span>
                <span>{month}</span>
            </p>

            <div className={style.movieTitleAndPlace}>
                <p className={style.movieTitle}>{movie.title}</p>
                <div className={style.hourAndPlace}>
                    <p className={style.hourly}>{hourly}</p>
                    <p className={style.theaterName}>{theater.name}</p>
                </div>
            </div>

            <svg className={style.circleSeparator} fill="none">
                <circle cx="5" cy="5" r="5" fill="#021F38" />
                <circle cx="5" cy="23" r="5" fill="#021F38" />
                <circle cx="5" cy="41" r="5" fill="#021F38" />
                <circle cx="5" cy="59" r="5" fill="#021F38" />
                <circle cx="5" cy="77" r="5" fill="#021F38" />
                <circle cx="5" cy="95" r="5" fill="#021F38" />
                <circle cx="5" cy="113" r="5" fill="#021F38" />
                <circle cx="5" cy="131" r="5" fill="#021F38" />
            </svg>

            <div className={style.movieAndDetailsButton}>
                <div className={style.movieCard}>
                    <MovieListCard movie={movie} />
                </div>
                <SeeDetailsBtn navigatePath={`/showtimes/${id}`} text="détails" showIcon={true} item={movie} />
            </div>
        </div>
    );
};

export default AgendaScreeningCard;

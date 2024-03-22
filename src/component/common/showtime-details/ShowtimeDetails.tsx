import { Link } from 'react-router-dom';
import config from '../../../config/config.helper';
import { useYearFromDate } from '../../../hook/date-hook/date.hook';
import { useTextDuration } from '../../../hook/string-hook/string.hook';
import { Movie } from '../../../models/Movie';
import { ScreeningDate } from '../../../models/ScreeningDate';
import { Theater } from '../../../models/Theater';
import pageStyle from '../../showtime-page/ShowtimePage.module.css';
import modaleStyle from './ShowtimeDetails.module.css';

interface ShowtimeDetailsProps {
    screeningDate: ScreeningDate;
    movie: Movie;
    theater: Theater;
    isBooked?: boolean;
}

export const ShowtimeDetails = (props: ShowtimeDetailsProps) => {
    const { screeningDate, movie, theater, isBooked = false } = props;
    const TMDB_PATH = config.tmdbImgPath.medium;
    const IMG_PATH = '/assets/img/theaters';
    const IMG_SUFFIX = '.jpg';
    const MAPS_PATH = 'https://maps.google.com/?q=';

    const style = isBooked ? pageStyle : modaleStyle;

    const duration = useTextDuration(movie.duration);
    const releaseYear = useYearFromDate(movie.releaseDate);

    return (
        <div className={style.showtimeWrapper}>
            <div className={style.movieAndDateWrapper}>
                {/* MOVIE */}
                <div className={style.movieBox}>
                    <Link to={`/movies/${movie.id}/day-1`} state={{ movie: movie }}>
                        <img
                            className={style.movieImg}
                            src={TMDB_PATH + movie.posterLink}
                            alt={`affiche du film ${movie.title}`}
                        />
                    </Link>
                    <div>
                        <Link to={`/movies/${movie.id}/day-1`} state={{ movie: movie }} className={style.movieTitle}>
                            {movie.title}
                        </Link>
                        <p className={style.movieDetails}>
                            {duration} ● {releaseYear}
                        </p>
                    </div>
                </div>
                <hr className={style.horizontalLineFirst} />

                {/* DATE */}
                <div className={style.dateBox}>
                    <div>
                        <p className={style.date}>
                            <svg
                                width="16"
                                height="17"
                                viewBox="0 0 16 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M2.78883 1H13.5218C14.5098 1 15.3107 1.82474 15.3107 2.84211V13.8947C15.3107 14.9121 14.5098 15.7368 13.5218 15.7368H2.78883C1.80089 15.7368 1 14.9121 1 13.8947V2.84211C1 1.82474 1.80089 1 2.78883 1Z"
                                    stroke="#FFFDEF"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M1 4.6842H15.3107"
                                    stroke="#FFFDEF"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Date
                        </p>
                        <p className={style.screeningDate}>
                            {screeningDate.dayName} {screeningDate.dayNumber} {screeningDate.month}
                        </p>
                    </div>
                    <div>
                        <p className={style.hourly}>
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7 14C5.61553 14 4.26216 13.5895 3.11101 12.8203C1.95987 12.0511 1.06266 10.9579 0.532846 9.67879C0.00303299 8.3997 -0.13559 6.99224 0.134506 5.63437C0.404603 4.2765 1.07129 3.02922 2.05026 2.05026C3.02922 1.07129 4.2765 0.404603 5.63437 0.134506C6.99224 -0.13559 8.3997 0.00303299 9.67879 0.532846C10.9579 1.06266 12.0511 1.95987 12.8203 3.11101C13.5895 4.26216 14 5.61553 14 7C14 8.85652 13.2625 10.637 11.9497 11.9497C10.637 13.2625 8.85652 14 7 14ZM7 1.07693C5.82853 1.07693 4.68336 1.42431 3.70932 2.07514C2.73527 2.72598 1.9761 3.65104 1.52779 4.73334C1.07949 5.81564 0.962193 7.00657 1.19074 8.15554C1.41928 9.3045 1.9834 10.3599 2.81175 11.1882C3.64011 12.0166 4.6955 12.5807 5.84447 12.8093C6.99343 13.0378 8.18436 12.9205 9.26667 12.4722C10.349 12.0239 11.274 11.2647 11.9249 10.2907C12.5757 9.31664 12.9231 8.17148 12.9231 7C12.9231 5.4291 12.299 3.92255 11.1882 2.81175C10.0775 1.70096 8.5709 1.07693 7 1.07693Z"
                                    fill="#FFFDEF"
                                />
                                <path
                                    d="M9.96192 10.5C9.89106 10.5004 9.82081 10.4868 9.7552 10.4601C9.6896 10.4333 9.62993 10.3938 9.57961 10.3439L6.61808 7.38233C6.56817 7.33202 6.52869 7.27235 6.50189 7.20674C6.4751 7.14114 6.46151 7.07089 6.46192 7.00002V2.69233C6.46192 2.54952 6.51865 2.41256 6.61963 2.31158C6.72062 2.2106 6.85758 2.15387 7.00038 2.15387C7.14319 2.15387 7.28015 2.2106 7.38113 2.31158C7.48212 2.41256 7.53885 2.54952 7.53885 2.69233V6.77925L10.3442 9.57925C10.3947 9.62931 10.4348 9.68886 10.4621 9.75448C10.4894 9.8201 10.5035 9.89048 10.5035 9.96156C10.5035 10.0326 10.4894 10.103 10.4621 10.1686C10.4348 10.2343 10.3947 10.2938 10.3442 10.3439C10.2939 10.3938 10.2342 10.4333 10.1686 10.4601C10.103 10.4868 10.0328 10.5004 9.96192 10.5Z"
                                    fill="#FFFDEF"
                                />
                            </svg>
                            Horaire
                        </p>
                        <p className={style.screeningHourly}>{screeningDate.hourly}</p>
                    </div>
                </div>
            </div>
            <hr className={style.horizontalLineSecond} />

            {/* THEATER */}
            <div className={style.theaterBox}>
                <img src={IMG_PATH + theater.imgPath + IMG_SUFFIX} alt={'photo de ' + theater.name} />
                <div className={style.theaterDetails}>
                    <div>
                        <p className={style.theaterName}>{theater.name}</p>
                        <p className={style.theaterAddress}>{theater.address}</p>
                    </div>
                    <a
                        className={style.mapBtn}
                        href={MAPS_PATH + theater.name + ' ' + theater.address}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M31 15V31L26 26L21 31L16 26L11 31L6 26L1 31V8L6 3L11 8L16 3"
                                stroke="#FFF1A7"
                                strokeMiterlimit="10"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M31 7C31 3.686 28.314 1 25 1C21.686 1 19 3.686 19 7C19 12 25 17 25 17C25 17 31 12 31 7Z"
                                stroke="#FFF1A7"
                                strokeMiterlimit="10"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M25 9C26.1046 9 27 8.10457 27 7C27 5.89543 26.1046 5 25 5C23.8954 5 23 5.89543 23 7C23 8.10457 23.8954 9 25 9Z"
                                stroke="#FFF1A7"
                                strokeMiterlimit="10"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Y aller !
                    </a>
                </div>
            </div>
        </div>
    );
};

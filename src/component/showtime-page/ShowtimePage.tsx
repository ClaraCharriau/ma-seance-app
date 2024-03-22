import { Link, useLoaderData } from 'react-router-dom';
import { Showtime } from '../../models/Showtime';
import { ShowtimeDetails } from '../common/showtime-details/ShowtimeDetails';
import style from './ShowtimePage.module.css';
import config from '../../config/config.helper';

const ShowtimePage = () => {
    const showtime = useLoaderData() as Showtime;
    const { schedule, movie, theater } = showtime;
    const TMDB_PATH = config.tmdbImgPath.medium;

    return (
        <main className={style.showtimeMain}>
            <h2 className={style.pageTitle}>Séance à venir</h2>
            <section className={style.showtimePageSection}>
                <Link to={`/movies/${movie.id}/day-1`} state={{ movie: movie }} className={style.movieDesktopImg}>
                    <img src={TMDB_PATH + movie.posterLink} alt={`affiche du film ${movie.title}`} />
                </Link>
                <div className={style.rightColumn}>
                    <ShowtimeDetails screeningDate={schedule} movie={movie} theater={theater} isBooked={true} />
                    <button className={style.bookingButton}>
                        Réserver ma séance
                        <svg width="29" height="24" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.23989 10.5462L19.4352 6.37522L21.8084 13.3139L9.61303 17.4849L7.23989 10.5462ZM23.9072 8.72093C24.3135 9.90906 25.4998 10.6093 26.6988 10.4453L27.901 13.9604C28.184 14.7878 27.7426 15.688 26.9152 15.971L7.20293 22.7128C6.37551 22.9958 5.47539 22.5545 5.19241 21.7271L3.99019 18.212C5.0384 17.6074 5.54743 16.3273 5.14108 15.1392C4.73472 13.9511 3.54842 13.2509 2.3495 13.4148L1.14728 9.8997C0.864297 9.07229 1.30562 8.17216 2.13304 7.88918L21.8453 1.1473C22.6727 0.864318 23.5729 1.30565 23.8559 2.13306L25.0581 5.64817C24.0099 6.25278 23.5008 7.53281 23.9072 8.72093ZM21.4214 4.80051C21.1459 3.99488 20.2694 3.56516 19.4638 3.8407L5.66519 8.56001C4.85956 8.83555 4.42984 9.71199 4.70538 10.5176L7.62685 19.0596C7.90239 19.8653 8.77883 20.295 9.58446 20.0194L23.3831 15.3001C24.1887 15.0246 24.6184 14.1481 24.3429 13.3425L21.4214 4.80051Z"
                                stroke="black"
                            />
                        </svg>
                    </button>
                    <button className={style.cancelButton}>Supprimer la séance</button>
                </div>
            </section>
        </main>
    );
};

export default ShowtimePage;

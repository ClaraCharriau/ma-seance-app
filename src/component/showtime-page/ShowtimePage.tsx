import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { deleteUserShowtime } from '../../client/users/user.client';
import config from '../../config/config.helper';
import { useAuthContext } from '../../context/auth.context';
import { Showtime } from '../../model/Showtime';
import ConfirmationModal from '../common/modal/confirmation-modal/ConfirmationModal';
import { ShowtimeDetails } from '../common/showtime-details/ShowtimeDetails';
import style from './ShowtimePage.module.css';

const ShowtimePage = () => {
    const { currentUser } = useAuthContext();
    const [showModale, setShowModale] = useState<boolean>(false);
    const showtime = useLoaderData() as Showtime;
    const navigate = useNavigate();

    // Calculate if the showtime is upcoming or not to set the correct page title
    const today = new Date();
    const showtimeDate = new Date(showtime.schedule.date);
    const pageTitle = showtimeDate > today ? 'Séance à venir' : 'Séance passée';

    const { schedule, movie, theater } = showtime;
    const TMDB_PATH = config.tmdbImgPath.medium;

    const deleteShowtime = async () => {
        try {
            currentUser &&
                showtime.id &&
                (await deleteUserShowtime(currentUser.id, showtime.id).then(() =>
                    toast.info(`La séance de ${movie.title} a été supprimée de votre agenda`, {
                        icon: () => (
                            <svg
                                width="52"
                                height="52"
                                viewBox="0 0 52 52"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M26.0001 0C40.3595 0 52 11.6406 52 26.0001C52 40.3595 40.3595 52 26.0001 52C11.6406 52 0 40.3595 0 26.0001C0 11.6406 11.6406 0 26.0001 0ZM26.0001 3.8994C13.7942 3.8994 3.8994 13.7942 3.8994 26.0001C3.8994 38.206 13.7942 48.1006 26.0001 48.1006C38.2058 48.1006 48.1006 38.206 48.1006 26.0001C48.1006 13.7942 38.2058 3.8994 26.0001 3.8994ZM25.9905 22.0981C26.9776 22.0976 27.7938 22.8304 27.9236 23.7819L27.9415 24.0465L27.9509 38.3485C27.9516 39.4252 27.0792 40.2987 26.0025 40.2995C25.0154 40.3 24.1991 39.5672 24.0694 38.6157L24.0515 38.3511L24.0421 24.0491C24.0413 22.9724 24.9137 22.0989 25.9905 22.0981ZM26.0012 13.0053C27.4351 13.0053 28.5974 14.1677 28.5974 15.6014C28.5974 17.0353 27.4351 18.1976 26.0012 18.1976C24.5675 18.1976 23.4049 17.0353 23.4049 15.6014C23.4049 14.1677 24.5675 13.0053 26.0012 13.0053Z"
                                    fill="#1B3043"
                                />
                            </svg>
                        )
                    })
                ));
            setShowModale(false);
            navigate('/agenda');
        } catch (error: any) {
            console.error('An error occured');
        }
    };

    return (
        <main className={style.showtimeMain}>
            <h2 className={style.pageTitle}>{pageTitle}</h2>
            <section className={style.showtimePageSection}>
                <Link to={`/movies/${movie.id}/day-1`} state={{ movie }} className={style.movieDesktopImg}>
                    <img src={TMDB_PATH + movie.posterLink} alt={`affiche du film ${movie.title}`} />
                </Link>
                <div className={style.rightColumn}>
                    <ShowtimeDetails screeningDate={schedule} movie={movie} theater={theater} isBooked={true} />
                    <a href={theater.bookingPath} className={style.bookingButton} target="_blank" rel="noreferrer">
                        Réserver ma séance
                        <svg width="29" height="24" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.23989 10.5462L19.4352 6.37522L21.8084 13.3139L9.61303 17.4849L7.23989 10.5462ZM23.9072 8.72093C24.3135 9.90906 25.4998 10.6093 26.6988 10.4453L27.901 13.9604C28.184 14.7878 27.7426 15.688 26.9152 15.971L7.20293 22.7128C6.37551 22.9958 5.47539 22.5545 5.19241 21.7271L3.99019 18.212C5.0384 17.6074 5.54743 16.3273 5.14108 15.1392C4.73472 13.9511 3.54842 13.2509 2.3495 13.4148L1.14728 9.8997C0.864297 9.07229 1.30562 8.17216 2.13304 7.88918L21.8453 1.1473C22.6727 0.864318 23.5729 1.30565 23.8559 2.13306L25.0581 5.64817C24.0099 6.25278 23.5008 7.53281 23.9072 8.72093ZM21.4214 4.80051C21.1459 3.99488 20.2694 3.56516 19.4638 3.8407L5.66519 8.56001C4.85956 8.83555 4.42984 9.71199 4.70538 10.5176L7.62685 19.0596C7.90239 19.8653 8.77883 20.295 9.58446 20.0194L23.3831 15.3001C24.1887 15.0246 24.6184 14.1481 24.3429 13.3425L21.4214 4.80051Z"
                                stroke="black"
                            />
                        </svg>
                    </a>
                    <button className={style.cancelButton} onClick={() => setShowModale(true)}>
                        Supprimer la séance
                    </button>
                </div>

                <ConfirmationModal
                    confirmationText={`Êtes-vous bien sûr de vouloir supprimer la séance du film ${movie.title} de votre agenda ?`}
                    openModal={showModale}
                    rightButtonCallback={() => setShowModale(false)}
                    leftButtonCallback={() => deleteShowtime()}
                />
            </section>
        </main>
    );
};

export default ShowtimePage;

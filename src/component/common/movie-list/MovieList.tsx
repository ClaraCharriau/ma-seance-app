import { useState } from 'react';
import { deleteUserFavMovie } from '../../../client/users/user.client';
import { useAuthContext } from '../../../context/auth.context';
import { Movie } from '../../../models/Movie';
import ConfirmationModal from '../modals/confirmation-modal/ConfirmationModal';
import MovieListCard from '../movie-list-card/MovieListCard';
import style from './MovieList.module.css';
import { toast } from 'react-toastify';

interface MovieListProps {
    movieList: Movie[];
    isUpdate: boolean;
}

const MovieList = (props: MovieListProps) => {
    const { movieList, isUpdate } = props;
    const { currentUser } = useAuthContext();

    const [showModale, setShowModale] = useState<boolean>(false);
    const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);

    const openDeleteConfirmationModale = (movie: Movie) => {
        setMovieToDelete(movie);
        setShowModale(true);
    };

    const deleteMovie = async () => {
        try {
            if (currentUser && movieToDelete) {
                await deleteUserFavMovie(currentUser.id, movieToDelete.id);
                toast.info(movieToDelete.title + ' a bien été supprimé de votre watchlist');
            }
            setShowModale(false);
        } catch (error: any) {
            console.error('An error occured.');
        }
    };

    return (
        <section className={style.movieList}>
            {movieList.map(movie => (
                <div key={movie.id} className={style.movieListCard}>
                    <MovieListCard movie={movie} />
                    {isUpdate && (
                        <button
                            data-testid="delete-button"
                            className={style.deleteButton}
                            onClick={() => {
                                openDeleteConfirmationModale(movie);
                            }}
                        >
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11 22C4.93412 22 0 17.0654 0 11C0 4.93465 4.93412 0 11 0C17.0659 0 22 4.93465 22 11C22 17.0654 17.0659 22 11 22ZM11 1.59629C5.81473 1.59629 1.59628 5.81473 1.59628 11C1.59628 16.1853 5.81473 20.4037 11 20.4037C16.1853 20.4037 20.4037 16.1853 20.4037 11C20.4037 5.81473 16.1853 1.59629 11 1.59629Z"
                                    fill="#EB6A5D"
                                />
                                <path
                                    d="M15.5719 16.495C15.467 16.495 15.3632 16.4744 15.2663 16.4344C15.1695 16.3943 15.0815 16.3355 15.0073 16.2614L5.86378 7.11735C5.78755 7.04373 5.72675 6.95566 5.68492 6.85828C5.64309 6.7609 5.62107 6.65617 5.62015 6.5502C5.61923 6.44422 5.63942 6.33912 5.67955 6.24103C5.71968 6.14294 5.77895 6.05383 5.85389 5.97889C5.92883 5.90395 6.01794 5.84468 6.11603 5.80455C6.21412 5.76442 6.31922 5.74423 6.42519 5.74515C6.53117 5.74607 6.6359 5.76809 6.73328 5.80992C6.83066 5.85175 6.91873 5.91255 6.99235 5.98878L16.1364 15.1328C16.2479 15.2445 16.3238 15.3867 16.3546 15.5415C16.3853 15.6962 16.3694 15.8567 16.309 16.0024C16.2486 16.1482 16.1463 16.2728 16.0151 16.3605C15.8839 16.4482 15.7297 16.495 15.5719 16.495Z"
                                    fill="#EB6A5D"
                                />
                                <path
                                    d="M6.42732 16.4949C6.26957 16.4948 6.11539 16.4479 5.98427 16.3602C5.85314 16.2725 5.75095 16.1479 5.6906 16.0021C5.63025 15.8563 5.61444 15.696 5.64518 15.5412C5.67592 15.3865 5.75182 15.2444 5.8633 15.1327L15.0068 5.98868C15.1565 5.83896 15.3595 5.75481 15.5712 5.75476C15.7829 5.75471 15.9859 5.83876 16.1357 5.98842C16.2854 6.13808 16.3695 6.34108 16.3696 6.55278C16.3696 6.76448 16.2856 6.96753 16.1359 7.11726L6.99188 16.2613C6.91773 16.3354 6.8297 16.3942 6.73284 16.4343C6.63597 16.4743 6.53216 16.4949 6.42732 16.4949Z"
                                    fill="#EB6A5D"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            ))}
            {movieToDelete && (
                <ConfirmationModal
                    confirmationText={`Êtes-vous bien sûr de vouloir supprimer le film ${movieToDelete.title} de votre watchlist ?`}
                    openModal={showModale}
                    rightButtonCallback={() => setShowModale(false)}
                    leftButtonCallback={() => deleteMovie()}
                />
            )}
        </section>
    );
};

export default MovieList;

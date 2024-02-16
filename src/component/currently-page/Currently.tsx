import { useEffect, useState } from 'react';
import MovieList from '../common/movie-list/MovieList';
import { getCurrentlyMovies } from '../../client/movies/movies.client';
import Spinner from '../common/spinner/Spinner';
import { Movie } from '../../models/Movie';
import useCurrentTheaterWeek from '../../hooks/useCurrentWeek';
import style from './Currently.module.css';

const Currently = () => {
    const [currentMovies, setCurrentMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const ERROR_MESSAGE = "Une erreur s'est produite lors du chargement des films.";
    const currentWeek = useCurrentTheaterWeek();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setError(ERROR_MESSAGE);
            setLoading(false);
        }, 5000); // 5s

        getCurrentlyMovies()
            .then(movies => {
                setCurrentMovies(movies);
                setLoading(false);
                clearTimeout(timeoutId);
            })
            .catch(() => {
                setError(ERROR_MESSAGE);
                setLoading(false);
            });

        return () => clearTimeout(timeoutId);
        // eslint-disable-next-line
    }, []);

    return (
        <main>
            <h2 className={style.pageTitle}>
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.3797 13.5808C13.2146 12.2051 12.2359 11.2264 10.861 4.06129C10.8398 3.95091 10.7807 3.85138 10.6941 3.7798C10.6074 3.70822 10.4986 3.66907 10.3862 3.66907C10.2738 3.66907 10.1649 3.70822 10.0782 3.7798C9.99158 3.85138 9.93257 3.95091 9.91135 4.06129C8.53646 11.2264 7.55772 12.2051 0.392208 13.5808C0.281863 13.6019 0.182333 13.6609 0.110748 13.7475C0.0391627 13.8341 0 13.9429 0 14.0552C0 14.1676 0.0391627 14.2764 0.110748 14.363C0.182333 14.4496 0.281863 14.5085 0.392208 14.5297C7.55769 15.9049 8.53646 16.8829 9.91135 24.0488C9.93267 24.1591 9.99172 24.2585 10.0784 24.33C10.165 24.4015 10.2738 24.4406 10.3862 24.4406C10.4985 24.4406 10.6073 24.4015 10.694 24.33C10.7806 24.2585 10.8397 24.1591 10.861 24.0488C12.2359 16.8829 13.2146 15.9049 20.3797 14.5297C20.4901 14.5085 20.5896 14.4496 20.6612 14.363C20.7328 14.2764 20.7719 14.1676 20.7719 14.0552C20.7719 13.9429 20.7328 13.8341 20.6612 13.7475C20.5896 13.6609 20.4901 13.6019 20.3797 13.5808Z"
                        fill="#FFF1A7"
                    />
                    <path
                        d="M19.8474 8.30516C19.735 8.30511 19.6261 8.26593 19.5395 8.19436C19.4529 8.1228 19.3938 8.0233 19.3726 7.91296C18.8883 5.38821 18.6118 5.1117 16.087 4.62741C15.9766 4.60618 15.8771 4.54716 15.8055 4.46051C15.734 4.37386 15.6948 4.26498 15.6948 4.15259C15.6948 4.0402 15.734 3.93132 15.8055 3.84467C15.8771 3.75802 15.9766 3.69901 16.087 3.67778C18.6122 3.19312 18.8883 2.91657 19.3726 0.392219C19.3938 0.281846 19.4528 0.182315 19.5395 0.110735C19.6261 0.0391555 19.735 0 19.8474 0C19.9598 0 20.0687 0.0391555 20.1553 0.110735C20.242 0.182315 20.301 0.281846 20.3222 0.392219C20.8065 2.91657 21.0826 3.19312 23.6078 3.67778C23.7181 3.69901 23.8176 3.75802 23.8892 3.84467C23.9608 3.93132 23.9999 4.0402 23.9999 4.15259C23.9999 4.26498 23.9608 4.37386 23.8892 4.46051C23.8176 4.54716 23.7181 4.60618 23.6078 4.62741C21.083 5.11166 20.8065 5.38821 20.3222 7.91296C20.3009 8.0233 20.2419 8.1228 20.1553 8.19437C20.0686 8.26594 19.9598 8.30511 19.8474 8.30516ZM18.0988 4.15259C18.5069 4.28641 18.8779 4.51438 19.1816 4.81807C19.4854 5.12177 19.7135 5.49266 19.8474 5.90079C19.9813 5.49266 20.2094 5.12177 20.5131 4.81807C20.8169 4.51438 21.1878 4.28641 21.596 4.15259C21.1879 4.01864 20.817 3.79063 20.5133 3.48695C20.2095 3.18328 19.9814 2.81245 19.8474 2.40438C19.7133 2.81244 19.4852 3.18328 19.1815 3.48695C18.8778 3.79063 18.5069 4.01864 18.0988 4.15259Z"
                        fill="#FFF1A7"
                    />
                </svg>
                Sorties de la semaine
            </h2>
            <p className={style.currentWeek}>{currentWeek}</p>
            {loading ? <Spinner /> : error ? <div>{error}</div> : <MovieList movieList={currentMovies} />}
        </main>
    );
};

export default Currently;

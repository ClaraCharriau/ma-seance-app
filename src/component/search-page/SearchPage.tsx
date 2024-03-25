import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMovies } from '../../client/movies/movies.client';
import { searchTheaters } from '../../client/theaters/theaters.client';
import { Movie } from '../../models/Movie';
import { Theater } from '../../models/Theater';
import MovieList from '../common/movie-list/MovieList';
import Spinner from '../common/spinner/Spinner';
import TheatersList from '../common/theaters-list/TheatersList';
import style from './SearchPage.module.css';

export const SearchPage = () => {
    const { search, state } = useLocation();
    const [movieResults, setMovieResults] = useState<Movie[]>([]);
    const [theaterResults, setTheaterResults] = useState<Theater[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isMovieSearch, setIsMovieSearch] = useState<boolean>(false);

    const ERROR_MESSAGE = "Une erreur s'est produite lors de votre recherche. Veuillez réessayer.";

    useEffect(() => {
        setError('');
        setLoading(true);
        const timeout = setTimeout(() => {
            setError(ERROR_MESSAGE);
            setLoading(false);
        }, 5000); // 5s

        if (!isMovieSearch) {
            searchTheaters(state.query)
                .then(response => {
                    setTheaterResults(response);
                    setLoading(false);
                    clearTimeout(timeout);
                })
                .catch(() => {
                    setError(ERROR_MESSAGE);
                    setLoading(false);
                });
        } else {
            searchMovies(state.query)
                .then(response => {
                    setMovieResults(response);
                    setLoading(false);
                    clearTimeout(timeout);
                })
                .catch(() => {
                    setError(ERROR_MESSAGE);
                    setLoading(false);
                });
        }

        return () => clearTimeout(timeout);
    }, [state.query, isMovieSearch]);

    const handleChange = () => {
        setIsMovieSearch(!isMovieSearch);
    };

    return (
        <main>
            <p>Résultats de la recherche "{state.query ?? search.split('?q=')}"</p>

            <div>
                <label className={style.switch}>
                    <input
                        className={style.switchInput}
                        type="checkbox"
                        checked={isMovieSearch}
                        onChange={handleChange}
                    />
                    <span className={style.switchSlider}></span>
                    <span className={style.cinemaLabel}>Cinémas</span>
                    <span className={style.filmLabel}>Films</span>
                </label>
            </div>

            {loading ? (
                <Spinner />
            ) : error ? (
                <div className={style.error}>{error}</div>
            ) : isMovieSearch && movieResults.length > 0 ? (
                <MovieList movieList={movieResults} />
            ) : !isMovieSearch && theaterResults.length > 0 ? (
                <TheatersList theaters={theaterResults} />
            ) : (
                <p>Aucun {isMovieSearch ? 'film' : 'cinéma'} ne corresponds à votre recherche.</p>
            )}
        </main>
    );
};

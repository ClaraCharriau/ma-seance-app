import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMovies } from '../../client/movies/movies.client';
import { searchTheaters } from '../../client/theaters/theaters.client';
import { Movie } from '../../models/Movie';
import { Theater } from '../../models/Theater';
import MovieList from '../common/movie-list/MovieList';
import Spinner from '../common/spinner/Spinner';
import TheatersList from '../common/theaters-list/TheatersList';

export const SearchPage = () => {
    const { search, state } = useLocation();
    const [movieResults, setMovieResults] = useState<Movie[]>([]);
    const [theaterResults, setTheaterResults] = useState<Theater[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const ERROR_MESSAGE = "Une erreur s'est produite lors de votre recherche. Veuillez réessayer.";

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setError(ERROR_MESSAGE);
            setLoading(false);
        }, 5000); // 5s

        console.log(state.query);
        searchMovies(state.query)
            .then(response => {
                setMovieResults(response);
                setLoading(false);
                clearTimeout(timeoutId);
            })
            .catch(() => {
                setError(ERROR_MESSAGE);
                setLoading(false);
            });

        searchTheaters(state.query)
            .then(response => {
                setTheaterResults(response);
                setLoading(false);
                clearTimeout(timeoutId);
            })
            .catch(() => {
                setError(ERROR_MESSAGE);
                setLoading(false);
            });

        return () => clearTimeout(timeoutId);
    }, [state.query]);

    return (
        <main>
            <p>Résultats de la recherche "{state.query ?? search.split('?q=')}"</p>

            {loading ? (
                <Spinner />
            ) : error ? (
                <div>{error}</div>
            ) : movieResults.length > 0 ? (
                <MovieList movieList={movieResults} />
            ) : (
                <p>Aucun film ne corresponds à votre recherche.</p>
            )}

            <TheatersList theaters={theaterResults} />
        </main>
    );
};

import MovieSummary from '../movie-summary/MovieSummary';
import { MovieScreenings } from '../../../models/MovieScreenings';
import style from './MoviesScreeningsList.module.css';
import { Await, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';
import Spinner from '../../common/spinner/Spinner';
import ErrorPage from '../../error-page/Error';

const MoviesScreeningsList = () => {
    const data = useLoaderData() as { movieScreenings: MovieScreenings[] };

    return (
        <Suspense fallback={<Spinner />}>
            <Await resolve={data.movieScreenings} errorElement={<ErrorPage />}>
                {(movieScreenings: MovieScreenings[]) => {
                    if (movieScreenings.length > 0) {
                        return (
                            <section className={style.showtimesSection}>
                                {movieScreenings.map(showtimes => (
                                    <MovieSummary
                                        key={showtimes.movie.id}
                                        movie={showtimes.movie}
                                        schedule={showtimes.schedule}
                                    />
                                ))}
                            </section>
                        );
                    } else {
                        return <p>Pas de séances ce jour-là...</p>;
                    }
                }}
            </Await>
        </Suspense>
    );
};

export default MoviesScreeningsList;

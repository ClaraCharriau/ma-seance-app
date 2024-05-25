import { Suspense } from 'react';
import { Await, useLoaderData, useLocation } from 'react-router-dom';
import { MovieScreenings } from '../../../model/MovieScreenings';
import Spinner from '../../common/spinner/Spinner';
import ErrorPage from '../../error-page/Error';
import MovieSummary from '../movie-summary/MovieSummary';
import style from './MoviesScreeningsList.module.css';

const MoviesScreeningsList = () => {
    const data = useLoaderData() as { movieScreenings: MovieScreenings[] };
    const location = useLocation();

    return (
        <Suspense fallback={<Spinner />}>
            <Await resolve={data.movieScreenings} errorElement={<ErrorPage />}>
                {(screenings: MovieScreenings[]) => {
                    if (screenings.length > 0) {
                        return (
                            <section className={style.showtimesSection}>
                                {screenings.map(showtimes => (
                                    <MovieSummary
                                        key={showtimes.movie.id}
                                        movie={showtimes.movie}
                                        showtimes={showtimes.showtimes}
                                        theater={location.state.theater}
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

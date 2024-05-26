import { Outlet, useLoaderData } from 'react-router-dom';
import style from './MovieDetailsLayout.module.css';
import config from '../../config/config.helper';
import WeekNavigation from '../common/week-navigation/WeekNavigation';
import MovieDetailsWrapper from './movie-details-wrapper/MovieDetailsWrapper';
import { Movie } from '../../model/Movie';

const MovieDetailsLayout = () => {
    const movie = useLoaderData() as Movie;
    const TMDB_PATH = config.tmdbimagePath.large;

    return (
        <>
            <div className={style.backgroundWrapper}>
                <img
                    className={style.movieBackground}
                    src={TMDB_PATH + movie.photoLink}
                    alt={'photo de ' + movie.title}
                />
                <div className={style.fading}></div>
            </div>

            <main className={style.movieDetailsMain}>
                <MovieDetailsWrapper movie={movie} />
                <section>
                    <WeekNavigation context="movies" />
                    <Outlet />
                </section>
            </main>
        </>
    );
};

export default MovieDetailsLayout;

import { useLoaderData } from 'react-router-dom';
import { Movie } from '../../models/Movie';
import style from './MovieDetails.module.css';
import useDurationFormat from '../../hooks/useDurationFormat';
import FavoriteButton from '../common/favorite-button/FavoriteButton';
import useStringListFormat from '../../hooks/useStringListFormat';
import useDateDMYFormat from '../../hooks/dates/useDateDMYFormat';

const MovieDetails = () => {
    const movie = useLoaderData() as Movie;

    const TMDB_PATH = 'https://image.tmdb.org/t/p/w500';

    const formattedDuration = useDurationFormat(movie.duration);
    const formattedReleaseDate = useDateDMYFormat(movie.releaseDate);
    const directors = useStringListFormat(movie.directors);
    const cast = useStringListFormat(movie.cast);
    const genres = useStringListFormat(movie.genres);

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
                <section className={style.movieInformations}>
                    <FavoriteButton itemId={movie.id} itemType={'movie'} />
                    <img
                        src={TMDB_PATH + movie.posterLink}
                        alt={'affiche de ' + movie.title}
                        className={style.moviePoster}
                    />
                    <div className={style.movieInfos}>
                        <div>
                            <h2 className={style.movieTitle}>{movie.title}</h2>
                            <p className={style.movieDetails}>
                                Sorti le {formattedReleaseDate} ● {genres} ● {formattedDuration}
                            </p>

                            <p className={style.directorText}>Réalisé par {directors}</p>
                            <p className={style.castText}>Avec {cast}...</p>
                            <p className={style.resume}>{movie.resume}</p>
                        </div>
                        <a href={movie.trailerLink} className={style.trailerLink} target="_blank" rel="noreferrer">
                            <svg
                                width="28"
                                height="20"
                                viewBox="0 0 28 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M26.9314 3.24972L26.9314 3.25001C27.2093 4.30825 27.3543 5.98 27.4275 7.42249C27.4638 8.13638 27.4819 8.78174 27.491 9.24865C27.4955 9.482 27.4977 9.67051 27.4989 9.8004C27.4994 9.86533 27.4997 9.9156 27.4999 9.94948L27.5 9.98777L27.5 9.99728L27.5 9.99957V10.0001V10.0002V10.0003V10.0008L27.5 10.003L27.5 10.0126L27.4999 10.0509C27.4997 10.0847 27.4994 10.135 27.4989 10.1999C27.4977 10.3298 27.4955 10.5183 27.491 10.7517C27.4819 11.2186 27.4638 11.8639 27.4275 12.5778C27.3543 14.0202 27.2093 15.6919 26.9315 16.75L26.9314 16.7503C26.6537 17.8104 25.8365 18.6403 24.8081 18.9207L24.8078 18.9208C24.3147 19.0556 23.4038 19.1653 22.2719 19.2496C21.1544 19.3327 19.8633 19.3884 18.6358 19.4256C17.409 19.4628 16.2497 19.4814 15.3968 19.4907C14.9705 19.4954 14.6209 19.4977 14.3781 19.4988C14.2567 19.4994 14.162 19.4997 14.0978 19.4999L14.0247 19.5L14.0061 19.5L14.0015 19.5H14.0004H14.0001L14 20L14 19.5H13.9997H13.9986L13.9939 19.5L13.9754 19.5L13.9023 19.4999C13.838 19.4997 13.7433 19.4994 13.6219 19.4988C13.3791 19.4977 13.0296 19.4954 12.6033 19.4907C11.7504 19.4814 10.591 19.4628 9.36427 19.4256C8.13667 19.3884 6.84564 19.3327 5.72808 19.2496C4.59624 19.1653 3.68528 19.0556 3.1922 18.9208L3.19193 18.9207C2.16369 18.6403 1.34631 17.8104 1.06868 16.7503L1.0686 16.75C0.790763 15.6918 0.645693 14.0202 0.572481 12.5778C0.536249 11.8639 0.518114 11.2186 0.509046 10.7517C0.504514 10.5183 0.502252 10.3298 0.501124 10.1999C0.500559 10.135 0.500278 10.0847 0.500139 10.0509L0.500017 10.0126L0.500002 10.003L0.5 10.0008L0.5 10.0003V10.0002V10.0002V10.0001L0.5 9.99957L0.500002 9.99728L0.500017 9.98777L0.500139 9.94948C0.500278 9.9156 0.500559 9.86534 0.501124 9.8004C0.502252 9.67051 0.504514 9.482 0.509046 9.24865C0.518114 8.78174 0.536249 8.13638 0.572481 7.4225C0.645693 5.98 0.790763 4.30826 1.0686 3.25002L1.06868 3.24972C1.3463 2.18964 2.16364 1.35997 3.19195 1.07947L3.19224 1.07939C3.68531 0.944578 4.59625 0.834777 5.7281 0.750521C6.84565 0.667329 8.13668 0.611624 9.36427 0.574408C10.591 0.537216 11.7504 0.518607 12.6033 0.5093C13.0296 0.504648 13.3791 0.502322 13.6219 0.501161C13.7433 0.50058 13.838 0.500289 13.9023 0.500144L13.9754 0.500018L13.9939 0.500002L13.9986 0.5L13.9997 0.5L14 0.5L14 0L14.0001 0.5L14.0004 0.5L14.0015 0.5L14.0061 0.500002L14.0247 0.500018L14.0978 0.500144C14.162 0.500289 14.2567 0.50058 14.3781 0.501161C14.6209 0.502322 14.9705 0.504648 15.3968 0.5093C16.2497 0.518607 17.409 0.537216 18.6358 0.574408C19.8633 0.611624 21.1544 0.667329 22.2719 0.750521C23.4038 0.834777 24.3147 0.944578 24.8078 1.07939L24.8081 1.07948C25.8366 1.35998 26.6538 2.18961 26.9314 3.24972ZM10.6999 14.2859V15.1608L11.4537 14.7167L18.7282 10.431L19.4594 10.0002L18.7282 9.56937L11.4537 5.28355L10.6999 4.83944V5.71434V14.2859Z"
                                    stroke="#FFF1A7"
                                />
                            </svg>
                            Bande annonce
                        </a>
                    </div>
                </section>
            </main>
        </>
    );
};

export default MovieDetails;

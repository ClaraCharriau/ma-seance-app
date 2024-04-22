import { useEffect, useState } from 'react';
import { User } from '../../../model/User';
import { Movie } from '../../../model/Movie';
import { getUserFavMovies } from '../../../client/users/user.client';
import { useMediaQuery } from 'react-responsive';
import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import style from './WatchlistCarousel.module.css';
import MovieCard from '../movie-card/MovieCard';
import SeeDetailsBtn from '../../common/see-details-btn/SeeDetailsBtn';
import EmptySection from '../../common/empty-section/EmptySection';
import Spinner from '../../common/spinner/Spinner';

interface FavMoviesCarouselProps {
    currentUser: User;
}

const WatchlistCarousel = (props: FavMoviesCarouselProps) => {
    const { currentUser } = props;
    const [favMovies, setFavMovies] = useState<Movie[]>([]);
    const [favMoviesTotal, setFavMoviesTotal] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const ERROR_MESSAGE = "Une erreur s'est produite lors du chargement des films.";

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setError(ERROR_MESSAGE);
            setLoading(false);
        }, 5000); // 5s

        getUserFavMovies(currentUser.id)
            .then(movies => {
                setFavMovies(movies.records);
                setFavMoviesTotal(movies._metadata.total_count);
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

    const isDesktop = useMediaQuery({
        query: '(min-device-width: 800px)'
    });
    const slideCount = isDesktop ? 2 : 4;

    return (
        <>
            <CarouselProvider
                visibleSlides={slideCount}
                totalSlides={favMovies.length}
                step={1}
                naturalSlideWidth={90}
                naturalSlideHeight={120}
                className={style.carousel}
            >
                {loading ? (
                    <Spinner />
                ) : error ? (
                    <div className={style.error}>{error}</div>
                ) : favMovies.length > 0 ? (
                    <>
                        <div className={style.sliderWrapper}>
                            <Slider className={style.slider}>
                                {favMovies.map((movie, index) => (
                                    <Slide index={index} key={movie.id} className={style.slide}>
                                        <MovieCard movie={movie} key={movie.id} />
                                    </Slide>
                                ))}
                            </Slider>
                            <div className={style.carouselShadow}></div>
                        </div>
                    </>
                ) : (
                    <EmptySection itemType="movie" />
                )}
            </CarouselProvider>
            <SeeDetailsBtn text={`Voir les ${favMoviesTotal} films >`} navigatePath="/watchlist" showIcon={false} />
        </>
    );
};

export default WatchlistCarousel;

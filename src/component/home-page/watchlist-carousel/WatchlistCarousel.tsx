import { useEffect, useState } from 'react';
import { User } from '../../../models/User';
import { Movie } from '../../../models/Movie';
import { getUserFavMovies } from '../../../client/users/user.client';
import { useMediaQuery } from 'react-responsive';
import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import style from './WatchlistCarousel.module.css';
import MovieCard from '../movie-card/MovieCard';
import SeeDetailsBtn from '../../common/see-details-btn/SeeDetailsBtn';

interface FavMoviesCarouselProps {
    currentUser: User;
}

const WatchlistCarousel = (props: FavMoviesCarouselProps) => {
    const { currentUser } = props;
    const [favMovies, setFavMovies] = useState<Movie[]>([]);
    const [favMoviesTotal, setFavMoviesTotal] = useState<number>(0);

    useEffect(() => {
        getUserFavMovies(currentUser.id).then(movies => {
            setFavMovies(movies.records);
            setFavMoviesTotal(movies._metadata.total_count);
        });
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
            </CarouselProvider>
            <SeeDetailsBtn text={`Voir les ${favMoviesTotal} films >`} navigatePath="/watchlist" showIcon={false} />
        </>
    );
};

export default WatchlistCarousel;

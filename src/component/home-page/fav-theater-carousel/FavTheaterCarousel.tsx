import { useEffect, useState } from 'react';
import { getUserFavTheaters } from '../../../client/user.client';
import { Theater } from '../../../models/Theater';
import { User } from '../../../models/User';
import FavTheaterCard from './FavTheaterCard';
import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import style from './FavTheater.module.css';
import { useMediaQuery } from 'react-responsive';

interface FavTheaterCarouselProps {
    currentUser: User;
}

const FavTheaterCarousel = (props: FavTheaterCarouselProps) => {
    const { currentUser } = props;
    const [favTheaters, setFavTheaters] = useState<Theater[]>([]);

    useEffect(() => {
        getUserFavTheaters(currentUser.id).then(theaters => {
            setFavTheaters(theaters);
        });
    }, [currentUser.id]);

    const isDesktop = useMediaQuery({
        query: '(min-device-width: 1024px)'
    });
    const isWideDesktop = useMediaQuery({
        query: '(min-device-width: 1524px)'
    });
    const isTablet = useMediaQuery({ query: '(min-device-width: 300px)' });
    const slideCount = isWideDesktop ? 5 : isDesktop ? 4 : isTablet ? 3 : 2;

    return (
        <CarouselProvider
            visibleSlides={slideCount}
            totalSlides={favTheaters.length}
            step={1}
            naturalSlideWidth={110}
            naturalSlideHeight={100}
            className={style.carousel}
        >
            <Slider className={style.slider}>
                {favTheaters.map(theater => (
                    <Slide index={theater.id} key={theater.id} className={style.slide}>
                        <FavTheaterCard theater={theater} key={theater.id} />
                    </Slide>
                ))}
            </Slider>
        </CarouselProvider>
    );
};

export default FavTheaterCarousel;

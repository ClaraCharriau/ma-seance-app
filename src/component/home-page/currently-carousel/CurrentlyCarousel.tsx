import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import { useEffect, useState } from 'react';
import { Movie } from '../../../models/Movie';
import style from './CurrentlyCarousel.module.css';
import { useMediaQuery } from 'react-responsive';
import { getCurrentlyMovies } from '../../../client/movies/movies.client';
import MovieCard from '../movie-card/MovieCard';

const CurrentlyCarousel = () => {
    const [currentMovies, setCurrentMovies] = useState<Movie[]>([]);

    useEffect(() => {
        getCurrentlyMovies().then(movies => setCurrentMovies(movies));
        // eslint-disable-next-line
    }, []);

    const isDesktop = useMediaQuery({
        query: '(min-device-width: 1024px)'
    });
    const isWideDesktop = useMediaQuery({
        query: '(min-device-width: 1524px)'
    });
    const isTablet = useMediaQuery({ query: '(min-device-width: 300px)' });
    const slideCount = isWideDesktop ? 6 : isDesktop ? 5 : isTablet ? 4 : 3;

    return (
        <CarouselProvider
            visibleSlides={slideCount}
            totalSlides={currentMovies.length}
            step={1}
            naturalSlideWidth={90}
            naturalSlideHeight={120}
            className={style.carousel}
        >
            <div className={style.sliderWrapper}>
                <Slider className={style.slider}>
                    {currentMovies.map((movie, index) => (
                        <Slide index={index} key={index} className={style.slide}>
                            <MovieCard movie={movie} />
                        </Slide>
                    ))}
                </Slider>
                <div className={style.carouselShadow}></div>
            </div>
            <div className={style.buttonWrapper}>
                <ButtonBack className={style.buttonBack}>
                    <svg width="24" height="24" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_1136_2707)">
                            <path
                                d="M9.5 0C7.62108 0 5.78435 0.557165 4.22209 1.60104C2.65982 2.64491 1.44218 4.12861 0.723149 5.86451C0.00411617 7.60041 -0.184015 9.51054 0.182544 11.3534C0.549104 13.1962 1.45389 14.8889 2.78249 16.2175C4.11109 17.5461 5.80383 18.4509 7.64665 18.8175C9.48947 19.184 11.3996 18.9959 13.1355 18.2769C14.8714 17.5578 16.3551 16.3402 17.399 14.7779C18.4428 13.2157 19 11.3789 19 9.5C18.9973 6.98129 17.9955 4.56652 16.2145 2.78552C14.4335 1.00452 12.0187 0.00275033 9.5 0ZM9.5 18.1094C7.79723 18.1094 6.1327 17.6044 4.71689 16.6584C3.30109 15.7124 2.1976 14.3678 1.54598 12.7947C0.894356 11.2215 0.723861 9.49045 1.05606 7.82039C1.38825 6.15034 2.20821 4.6163 3.41226 3.41225C4.6163 2.20821 6.15034 1.38825 7.8204 1.05605C9.49045 0.723857 11.2215 0.894352 12.7947 1.54597C14.3678 2.1976 15.7124 3.30108 16.6584 4.71689C17.6044 6.13269 18.1094 7.79723 18.1094 9.5C18.1066 11.7825 17.1987 13.9707 15.5847 15.5847C13.9707 17.1987 11.7825 18.1066 9.5 18.1094Z"
                                fill="white"
                            />
                            <path
                                d="M11.0022 5.32591C10.9187 5.24252 10.8055 5.19568 10.6875 5.19568C10.5695 5.19568 10.4563 5.24252 10.3728 5.32591L6.51344 9.18529C6.43005 9.26878 6.38321 9.38197 6.38321 9.49997C6.38321 9.61798 6.43005 9.73117 6.51344 9.81466L10.3728 13.674C10.4572 13.7527 10.5689 13.7955 10.6843 13.7935C10.7996 13.7914 10.9097 13.7447 10.9913 13.6631C11.0729 13.5815 11.1196 13.4715 11.1216 13.3561C11.1237 13.2407 11.0809 13.1291 11.0022 13.0447L7.45751 9.49997L11.0022 5.95529C11.0856 5.87179 11.1324 5.75861 11.1324 5.6406C11.1324 5.52259 11.0856 5.40941 11.0022 5.32591Z"
                                fill="white"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_1136_2707">
                                <rect width="19" height="19" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </ButtonBack>
                <ButtonNext className={style.buttonNext}>
                    <svg width="24" height="24" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_1136_2704)">
                            <path
                                d="M9.5 19C11.3789 19 13.2156 18.4428 14.7779 17.399C16.3402 16.3551 17.5578 14.8714 18.2769 13.1355C18.9959 11.3996 19.184 9.48946 18.8175 7.64664C18.4509 5.80382 17.5461 4.11108 16.2175 2.78249C14.8889 1.45389 13.1962 0.5491 11.3534 0.18254C9.51053 -0.184019 7.6004 0.00411221 5.8645 0.723145C4.12861 1.44218 2.64491 2.65982 1.60103 4.22208C0.55716 5.78435 -4.52995e-06 7.62108 -4.52995e-06 9.5C0.0027458 12.0187 1.00452 14.4335 2.78552 16.2145C4.56652 17.9955 6.98128 18.9972 9.5 19ZM9.5 0.890625C11.2028 0.890625 12.8673 1.39556 14.2831 2.34157C15.6989 3.28758 16.8024 4.63218 17.454 6.20533C18.1056 7.77849 18.2761 9.50955 17.9439 11.1796C17.6117 12.8497 16.7918 14.3837 15.5877 15.5877C14.3837 16.7918 12.8497 17.6118 11.1796 17.9439C9.50955 18.2761 7.77849 18.1056 6.20533 17.454C4.63217 16.8024 3.28757 15.6989 2.34156 14.2831C1.39555 12.8673 0.89062 11.2028 0.89062 9.5C0.89337 7.2175 1.80131 5.02927 3.41529 3.41529C5.02926 1.80131 7.21749 0.893375 9.5 0.890625Z"
                                fill="white"
                            />
                            <path
                                d="M7.99781 13.6741C8.0813 13.7575 8.19449 13.8043 8.3125 13.8043C8.4305 13.8043 8.54369 13.7575 8.62718 13.6741L12.4866 9.81471C12.5699 9.73122 12.6168 9.61803 12.6168 9.50003C12.6168 9.38202 12.5699 9.26883 12.4866 9.18534L8.62718 5.32596C8.54277 5.2473 8.43111 5.20448 8.31575 5.20651C8.20038 5.20855 8.09031 5.25529 8.00872 5.33687C7.92713 5.41846 7.8804 5.52854 7.87836 5.6439C7.87633 5.75927 7.91915 5.87092 7.99781 5.95534L11.5425 9.50003L7.99781 13.0447C7.91442 13.1282 7.86757 13.2414 7.86757 13.3594C7.86757 13.4774 7.91442 13.5906 7.99781 13.6741Z"
                                fill="white"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_1136_2704">
                                <rect width="19" height="19" fill="white" transform="matrix(-1 0 0 -1 19 19)" />
                            </clipPath>
                        </defs>
                    </svg>
                </ButtonNext>
            </div>
        </CarouselProvider>
    );
};

export default CurrentlyCarousel;

import { Movie } from '../../model/Movie';
import { TheaterScreenings } from '../../model/TheaterScreenings';
import { axiosInstance } from '../axios.config';
import config from '../../config/config.helper';

const MOVIES_PATH = config.services.movies.movies;
const CURRENTLY_PATH = MOVIES_PATH + config.services.movies.currently;
const SCREENINGS_PATH = config.services.movies.screenings;
const EXTENDED_INFOS_PARAM = '?extended_infos=true';

export const getCurrentlyMovies = async (): Promise<Movie[]> => {
    return await axiosInstance.get(CURRENTLY_PATH);
};

export const getCurrentlyMoviesWithDetails = async (): Promise<Movie[]> => {
    return await axiosInstance.get(CURRENTLY_PATH + EXTENDED_INFOS_PARAM);
};

export const getMovieById = async (movieId: string): Promise<Movie> => {
    return await axiosInstance.get(MOVIES_PATH + '/' + movieId + '?extended_infos=true');
};

export const getTheaterScreeningsByMovieIdAndDay = async (
    movieId: string,
    day: string
): Promise<TheaterScreenings[]> => {
    const params = { day };
    return await axiosInstance.get(MOVIES_PATH + '/' + movieId + SCREENINGS_PATH, { params });
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
    return await axiosInstance.get(MOVIES_PATH + '/search?q=' + query);
};

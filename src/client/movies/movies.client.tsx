import { Movie } from '../../models/Movie';
import { TheaterScreenings } from '../../models/TheaterScreenings';
import { axiosInstance } from '../axios.config';

const MOVIES_PATH = '/movies';
const CURRENTLY_PATH = MOVIES_PATH + '/currently';
const SCREENINGS_PATH = '/screenings';

export const getCurrentlyMovies = async (): Promise<Movie[]> => {
    return await axiosInstance.get(CURRENTLY_PATH);
};

export const getMovieById = async (movieId: string): Promise<Movie> => {
    return await axiosInstance.get(MOVIES_PATH + '/' + movieId);
};

export const getTheaterScreeningsByMovieIdAndDay = async (
    movieId: string,
    day: string
): Promise<TheaterScreenings[]> => {
    const params = {
        day
    };
    return await axiosInstance.get(MOVIES_PATH + '/' + movieId + SCREENINGS_PATH, { params });
};

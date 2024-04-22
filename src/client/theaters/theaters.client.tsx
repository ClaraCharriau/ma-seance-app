import { Movie } from '../../model/Movie';
import { MovieScreenings } from '../../model/MovieScreenings';
import { Theater } from '../../model/Theater';
import { axiosInstance } from '../axios.config';

const THEATERS_PATH = '/theaters';
const SCREENINGS_PATH = '/screenings';

export const getTheaterById = async (theaterId: string): Promise<Theater> => {
    return await axiosInstance.get(THEATERS_PATH + '/' + theaterId);
};

export const getTheaterMoviesByTheaterId = async (theaterId: string): Promise<Movie[]> => {
    return await axiosInstance.get(THEATERS_PATH + '/' + theaterId + '/movies');
};

export const getMovieScreeningsByTheaterIdAndDay = async (
    theaterId: string,
    day: string
): Promise<MovieScreenings[]> => {
    const params = {
        day
    };
    return await axiosInstance.get(THEATERS_PATH + '/' + theaterId + SCREENINGS_PATH, { params });
};

export const searchTheaters = async (query: string): Promise<Theater[]> => {
    return await axiosInstance.get(THEATERS_PATH + '/search?q=' + query);
};

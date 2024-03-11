import axios from 'axios';
import { HOST, handleError, handleResponse } from '../client.utils';
import { Theater } from '../../models/Theater';
import { Movie } from '../../models/Movie';
import { MovieScreenings } from '../../models/MovieScreenings';

const THEATERS_PATH = HOST + '/theaters';
const SCREENINGS_PATH = '/screenings';

export const getTheaterById = async (theaterId: string): Promise<Theater> => {
    return await axios
        .get(THEATERS_PATH + '/' + theaterId)
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

export const getTheaterMoviesByTheaterId = async (theaterId: string): Promise<Movie[]> => {
    return await axios
        .get(THEATERS_PATH + '/' + theaterId + '/movies')
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

export const getMovieScreeningsByTheaterIdAndDay = async (
    theaterId: string,
    day: string
): Promise<MovieScreenings[]> => {
    const params = {
        day
    };
    return await axios
        .get(THEATERS_PATH + '/' + theaterId + SCREENINGS_PATH, { params })
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

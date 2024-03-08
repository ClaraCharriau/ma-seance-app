import axios from 'axios';
import { HOST, handleError, handleResponse } from '../client.utils';
import { Movie } from '../../models/Movie';
import { TheaterScreenings } from '../../models/TheaterScreenings';

const MOVIES_PATH = HOST + '/movies';
const CURRENTLY_PATH = MOVIES_PATH + '/currently';
const SCREENINGS_PATH = '/screenings';

export const getCurrentlyMovies = async (): Promise<Movie[]> => {
    return await axios
        .get(CURRENTLY_PATH)
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

export const getMovieById = async (movieId: string): Promise<Movie> => {
    return await axios
        .get(MOVIES_PATH + '/' + movieId)
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

export const getTheaterScreeningsByMovieIdAndDay = async (
    movieId: string,
    day: string
): Promise<TheaterScreenings[]> => {
    const params = {
        day
    };
    return await axios
        .get(MOVIES_PATH + '/' + movieId + SCREENINGS_PATH, { params })
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

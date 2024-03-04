import axios from 'axios';
import { MovieScreenings } from '../../models/MovieScreenings';
import { HOST, handleError, handleResponse } from '../client.utils';
import { TheaterScreenings } from '../../models/TheaterScreenings';

const screenings_path = HOST + '/screenings';

export const getMovieScreeningsByTheaterAndDay = async (theaterId: string, day: string): Promise<MovieScreenings[]> => {
    const params = {
        day
    };
    return await axios
        .get(screenings_path + '/theaters/' + theaterId, { params })
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
        .get(screenings_path + '/movies/' + movieId, { params })
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

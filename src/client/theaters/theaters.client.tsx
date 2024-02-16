import axios from 'axios';
import { HOST, handleError, handleResponse } from '../client.utils';
import { Theater } from '../../models/Theater';
import { Movie } from '../../models/Movie';

const theaters_path = HOST + '/theaters';

export const getTheaterById = async (theaterId: number): Promise<Theater> => {
    return await axios
        .get(theaters_path + '/' + theaterId)
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

export const getTheaterMoviesByTheaterId = async (theaterId: string): Promise<Movie[]> => {
    return await axios
        .get(theaters_path + '/' + theaterId + '/movies')
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

import axios from 'axios';
import { HOST, handleError, handleResponse } from '../client.utils';
import { Movie } from '../../models/Movie';

const movies_path = HOST + '/movies';

export const getCurrentlyMovies = async (): Promise<Movie[]> => {
    return await axios
        .get(movies_path + '/currently')
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

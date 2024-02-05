import { Theater } from '../models/Theater';
import axios from 'axios';
import { handleError, handleResponse } from './client.utils';

const host = 'http://localhost:7878';
const users_path = host + '/users';

export const getUserFavTheaters = async (id: number): Promise<Theater[]> => {
    return await axios
        .get(users_path + '/' + id + '/fav-theaters')
        .then(response => handleResponse(response))
        .catch(error => handleError(error, 'GET /fav-theaters'));
};

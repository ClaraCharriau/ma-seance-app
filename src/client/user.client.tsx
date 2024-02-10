import { Theater } from '../models/Theater';
import axios from 'axios';
import { HOST, handleError, handleResponse } from './client.utils';

const users_path = HOST + '/users';

export const getUserFavTheaters = async (id: number): Promise<Theater[]> => {
    return await axios
        .get(users_path + '/' + id + '/fav-theaters')
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

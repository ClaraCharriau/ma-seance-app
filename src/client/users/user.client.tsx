import { Theater } from '../../models/Theater';
import axios from 'axios';
import { HOST, handleError, handleResponse } from '../client.utils';

const users_path = HOST + '/users';

export const getUserFavTheaters = async (userId: number): Promise<Theater[]> => {
    return await axios
        .get(users_path + '/' + userId + '/fav-theaters')
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

export const updateUserFavTheaters = async (userId: number, theaterId: number): Promise<void> => {
    return await axios
        .patch(users_path + '/' + userId + '/fav-theaters', theaterId)
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

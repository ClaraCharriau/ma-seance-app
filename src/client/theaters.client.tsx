import axios from 'axios';
import { HOST, handleError, handleResponse } from './client.utils';
import { Theater } from '../models/Theater';

const theaters_path = HOST + '/theaters';

export const getTheaterById = async (id: number): Promise<Theater> => {
    return await axios
        .get(theaters_path + '/' + id)
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

import axios from 'axios';
import { MovieScreenings } from '../../models/MovieScreenings';
import { HOST, handleError, handleResponse } from '../client.utils';

const screenings_path = HOST + '/screenings';

export const getMovieScreeningsByTheaterAndDay = async (theaterId: string, day: string): Promise<MovieScreenings[]> => {
    const params = {
        theaterId,
        day
    };
    return await axios
        .get(screenings_path, { params })
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

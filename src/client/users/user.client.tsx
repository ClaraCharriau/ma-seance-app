import { Theater } from '../../models/Theater';
import axios from 'axios';
import { HOST, PaginatedMovieResponse, handleError, handleResponse } from '../client.utils';
import { Showtime } from '../../models/Screening';

const users_path = HOST + '/users';

export const getUserFavTheaters = async (userId: string): Promise<Theater[]> => {
    return await axios
        .get(users_path + '/' + userId + '/fav-theaters')
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

export const updateUserFavTheaters = async (userId: string, theaterId: string): Promise<void> => {
    return await axios
        .patch(users_path + '/' + userId + '/fav-theaters', theaterId)
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

export const getUserFavMovies = async (userId: string): Promise<PaginatedMovieResponse> => {
    return await axios
        .get(users_path + '/' + userId + '/fav-movies')
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

export const updateUserFavMovies = async (userId: string, movieId: string): Promise<void> => {
    return await axios
        .patch(users_path + '/' + userId + '/fav-movies', movieId)
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

export const getUserAgenda = async (userId: string): Promise<Showtime[]> => {
    return await axios
        .get(users_path + '/' + userId + '/showtimes')
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

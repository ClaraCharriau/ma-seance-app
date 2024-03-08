import { Theater } from '../../models/Theater';
import axios from 'axios';
import { HOST, PaginatedMovieResponse, handleError, handleResponse } from '../client.utils';
import { Showtime } from '../../models/Screening';

const users_path = HOST + '/users';

export const getUserFavTheaters = async (userId: number): Promise<Theater[]> => {
    return await axios
        .get(users_path + '/' + userId + '/fav-theaters')
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

export const updateUserFavTheaters = async (userId: number, theaterId: string): Promise<void> => {
    return await axios
        .patch(users_path + '/' + userId + '/fav-theaters', theaterId)
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

export const getUserFavMovies = async (userId: number): Promise<PaginatedMovieResponse> => {
    return await axios
        .get(users_path + '/' + userId + '/fav-movies')
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

export const updateUserFavMovies = async (userId: number, movieId: string): Promise<void> => {
    return await axios
        .patch(users_path + '/' + userId + '/fav-movies', movieId)
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

export const getUserAgenda = async (userId: number): Promise<Showtime[]> => {
    return await axios
        .get(users_path + '/' + userId + '/showtimes')
        .then(response => handleResponse(response))
        .catch(error => handleError(error));
};

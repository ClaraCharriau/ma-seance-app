import { PaginatedMovieResponse } from '../../model/PaginatedResponse';
import { Showtime } from '../../model/Showtime';
import { Theater } from '../../model/Theater';
import { axiosInstance } from '../axios.config';

const USERS_PATH = '/users/';
const FAV_THEATERS_PATH = '/fav-theaters';
const FAV_MOVIES_PATH = '/fav-movies';
const SHOWTIMES_PATH = '/showtimes';

export const getUserFavTheaters = async (userId: string): Promise<Theater[]> => {
    return await axiosInstance.get(USERS_PATH + userId + FAV_THEATERS_PATH);
};

export const updateUserFavTheaters = async (userId: string, theaterId: string): Promise<void> => {
    return await axiosInstance.patch(USERS_PATH + userId + FAV_THEATERS_PATH + '/' + theaterId);
};

export const deleteUserFavTheater = async (userId: string, theaterId: string): Promise<void> => {
    return await axiosInstance.delete(USERS_PATH + userId + FAV_THEATERS_PATH + '/' + theaterId);
};

export const getUserFavMovies = async (userId: string): Promise<PaginatedMovieResponse> => {
    return await axiosInstance.get(USERS_PATH + userId + FAV_MOVIES_PATH);
};

export const updateUserFavMovies = async (userId: string, movieId: string): Promise<void> => {
    return await axiosInstance.patch(USERS_PATH + userId + FAV_MOVIES_PATH + '/' + movieId);
};

export const deleteUserFavMovie = async (userId: string, movieId: string): Promise<void> => {
    return await axiosInstance.delete(USERS_PATH + userId + FAV_MOVIES_PATH + '/' + movieId);
};

export const getUserShowtimes = async (userId: string): Promise<Showtime[]> => {
    return await axiosInstance.get(USERS_PATH + userId + SHOWTIMES_PATH);
};

export const updateUserShowtimes = async (userId: string, showtime: Showtime): Promise<Showtime[]> => {
    return await axiosInstance.patch(USERS_PATH + userId + SHOWTIMES_PATH, showtime);
};

export const deleteUserShowtime = async (userId: string, showtimeId: string): Promise<void> => {
    return await axiosInstance.delete(USERS_PATH + userId + SHOWTIMES_PATH + '/' + showtimeId);
};

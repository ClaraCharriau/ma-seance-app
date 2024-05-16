import { PaginatedMovieResponse } from '../../model/PaginatedResponse';
import { Showtime } from '../../model/Showtime';
import { Theater } from '../../model/Theater';
import { axiosInstance } from '../axios.config';
import config from '../../config/config.helper';

const USERS_PATH = config.services.users.users;
const FAV_THEATERS_PATH = config.services.users.favTheaters;
const FAV_MOVIES_PATH = config.services.users.favMovies;
const SCREENINGS_PATH = config.services.users.screenings;

export const getUserFavTheaters = async (userId: string): Promise<Theater[]> => {
    return await axiosInstance.get(USERS_PATH + userId + FAV_THEATERS_PATH);
};

export const updateUserFavTheaters = async (userId: string, theaterId: string): Promise<void> => {
    return await axiosInstance.post(USERS_PATH + userId + FAV_THEATERS_PATH + '/' + theaterId);
};

export const deleteUserFavTheater = async (userId: string, theaterId: string): Promise<void> => {
    return await axiosInstance.delete(USERS_PATH + userId + FAV_THEATERS_PATH + '/' + theaterId);
};

export const getUserFavMovies = async (userId: string): Promise<PaginatedMovieResponse> => {
    return await axiosInstance.get(USERS_PATH + userId + FAV_MOVIES_PATH);
};

export const addToUserFavMovies = async (userId: string, movieId: string): Promise<void> => {
    return await axiosInstance.post(USERS_PATH + userId + FAV_MOVIES_PATH + '/' + movieId);
};

export const deleteUserFavMovie = async (userId: string, movieId: string): Promise<void> => {
    return await axiosInstance.delete(USERS_PATH + userId + FAV_MOVIES_PATH + '/' + movieId);
};

export const getUserShowtimes = async (userId: string): Promise<Showtime[]> => {
    return await axiosInstance.get(USERS_PATH + userId + SCREENINGS_PATH);
};

export const updateUserShowtimes = async (userId: string, showtime: Showtime): Promise<Showtime[]> => {
    return await axiosInstance.post(USERS_PATH + userId + SCREENINGS_PATH + '/' + showtime.id);
};

export const deleteUserShowtime = async (userId: string, showtimeId: string): Promise<void> => {
    return await axiosInstance.delete(USERS_PATH + userId + SCREENINGS_PATH + '/' + showtimeId);
};

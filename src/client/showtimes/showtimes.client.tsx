import { Showtime } from '../../model/Showtime';
import { axiosInstance } from '../axios.config';
import config from '../../config/config.helper';

const SCREENINGS_PATH = config.services.screenings.screenings;

export const getShowtimeById = async (showtimeId: string): Promise<Showtime> => {
    return await axiosInstance.get(SCREENINGS_PATH + '/' + showtimeId);
};

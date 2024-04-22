import { Showtime } from '../../model/Showtime';
import { axiosInstance } from '../axios.config';

const SHOWTIMES_PATH = '/showtimes';

export const getShowtimeById = async (showtimeId: string): Promise<Showtime> => {
    return await axiosInstance.get(SHOWTIMES_PATH + '/' + showtimeId);
};

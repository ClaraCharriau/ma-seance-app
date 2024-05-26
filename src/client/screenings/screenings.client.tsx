import { Screening } from '../../model/Screening';
import { axiosInstance } from '../axios.config';
import config from '../../config/config.helper';

const SCREENINGS_PATH = config.services.screenings.screenings;

export const getScreeningById = async (screeningId: string): Promise<Screening> => {
    return await axiosInstance.get(SCREENINGS_PATH + '/' + screeningId);
};

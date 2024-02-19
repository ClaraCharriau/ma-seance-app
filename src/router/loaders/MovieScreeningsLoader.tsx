import { ActionFunctionArgs } from 'react-router-dom';
import { getMovieScreeningsByTheaterAndDay as getMovieScreeningsByTheaterIdAndDay } from '../../client/screenings/screenings.client';

export const movieScreeningsLoader = async (args: ActionFunctionArgs) => {
    const { params } = args;
    let { theaterId } = params;
    const { date } = params;

    // Theater id
    if (theaterId === undefined) {
        theaterId = '';
        // api call will throw error anyway
    }

    // Selected date
    let day = new Date();
    if (date !== undefined) {
        day = new Date(date);
    }
    return await getMovieScreeningsByTheaterIdAndDay(theaterId, day);
};

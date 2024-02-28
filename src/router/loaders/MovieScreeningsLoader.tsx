import { ActionFunctionArgs } from 'react-router-dom';
import { getMovieScreeningsByTheaterAndDay as getMovieScreeningsByTheaterIdAndDay } from '../../client/screenings/screenings.client';
import { formatISO } from 'date-fns';

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
    let day = formatISO(new Date(), { representation: 'date' });
    if (date !== undefined) {
        day = formatISO(new Date(date), { representation: 'date' });
    }
    return await getMovieScreeningsByTheaterIdAndDay(theaterId, day);
};

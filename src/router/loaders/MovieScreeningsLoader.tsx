import { ActionFunctionArgs } from 'react-router-dom';
import { getMovieScreeningsByTheaterAndDay as getMovieScreeningsByTheaterIdAndDay } from '../../client/screenings/screenings.client';

export const movieScreeningsLoader = async (args: ActionFunctionArgs) => {
    const { params } = args;
    let { theaterId, day } = params;

    // Theater id
    if (theaterId === undefined) {
        theaterId = '';
        // api call will throw error anyway
    }

    // Selected day
    if (day === undefined) {
        day = '1';
    }
    // remove "day"
    day = day.split('-')[1];

    return await getMovieScreeningsByTheaterIdAndDay(theaterId, day);
};

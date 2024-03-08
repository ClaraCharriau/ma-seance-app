import { ActionFunctionArgs } from 'react-router-dom';
import { getMovieScreeningsByTheaterIdAndDay } from '../../client/theaters/theaters.client';

export const movieScreeningsLoader = async (args: ActionFunctionArgs) => {
    const { params } = args;
    let { id, day } = params;

    // Theater id
    if (id === undefined) {
        id = '';
        // api call will throw error anyway
    }

    // Selected day
    if (day === undefined) {
        day = '1';
    }
    // remove "day"
    day = day.split('-')[1];

    return await getMovieScreeningsByTheaterIdAndDay(id, day);
};

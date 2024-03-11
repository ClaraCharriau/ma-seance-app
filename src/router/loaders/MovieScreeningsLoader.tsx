import { ActionFunctionArgs, defer } from 'react-router-dom';
import { getMovieScreeningsByTheaterIdAndDay } from '../../client/theaters/theaters.client';

export const movieScreeningsLoader = async (args: ActionFunctionArgs) => {
    const { params } = args;
    const { id } = params;
    let { day } = params;

    if (!id || id === undefined) {
        throw new Error();
    }

    if (!day || day === undefined) {
        day = '1';
    }
    // remove "day"
    day = day.split('-')[1];

    const movieScreeningsPromise = await getMovieScreeningsByTheaterIdAndDay(id, day);

    return defer({ movieScreenings: movieScreeningsPromise });
};

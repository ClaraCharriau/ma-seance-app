import { ActionFunctionArgs } from 'react-router-dom';
import { getShowtimeById } from '../../../client/showtimes/showtimes.client';

/**
 * Loader that provide the showtime infos before the page renders
 */
export const showtimeLoader = async (args: ActionFunctionArgs) => {
    const { params } = args;
    const { id } = params;

    if (!id || id === undefined) {
        throw new Error();
    }

    return await getShowtimeById(id);
};

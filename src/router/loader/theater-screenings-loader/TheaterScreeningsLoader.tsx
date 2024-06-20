import { LoaderFunctionArgs } from 'react-router-dom';
import { getTheaterScreeningsByMovieIdAndDayAndUserId } from '../../../client/movies/movies.client';
import { User } from '../../../model/User';

/**
 * Loader that provide the theater screenings before the page renders
 */
export const theaterScreeningsLoader = (currentUser: User | null) => async (args: LoaderFunctionArgs) => {
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

    // eslint-disable-next-line
    return await getTheaterScreeningsByMovieIdAndDayAndUserId(id, day, currentUser!.id);
};

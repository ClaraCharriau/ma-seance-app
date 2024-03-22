import { ActionFunctionArgs } from 'react-router-dom';
import { getMovieById } from '../../../client/movies/movies.client';

/**
 * Loader that provide the movie details before the page renders
 */
export const movieLoader = async (args: ActionFunctionArgs) => {
    const { params } = args;
    const { id } = params;
    if (!id || id === undefined) {
        throw new Error();
    }

    return await getMovieById(id);
};

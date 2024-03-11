import { ActionFunctionArgs } from 'react-router-dom';
import { getMovieById } from '../../client/movies/movies.client';

export const movieLoader = async (args: ActionFunctionArgs) => {
    const { params } = args;
    const { id } = params;
    if (!id || id === undefined) {
        throw new Error();
    }

    return await getMovieById(id);
};

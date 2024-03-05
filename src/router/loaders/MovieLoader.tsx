import { ActionFunctionArgs } from 'react-router-dom';
import { getMovieById } from '../../client/movies/movies.client';

export const movieLoader = async (args: ActionFunctionArgs) => {
    const { params } = args;
    let { id } = params;
    if (id === undefined) {
        id = '';
    }

    return await getMovieById(id);
};

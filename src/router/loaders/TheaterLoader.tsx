import { ActionFunctionArgs, defer } from 'react-router-dom';
import { getTheaterById } from '../../client/theaters/theaters.client';

export const theaterLoader = async (args: ActionFunctionArgs) => {
    const { params } = args;
    const { id } = params;

    if (!id || id === undefined) {
        throw new Error();
    }

    const theaterPromise = await getTheaterById(id);

    return defer({ theater: theaterPromise });
};

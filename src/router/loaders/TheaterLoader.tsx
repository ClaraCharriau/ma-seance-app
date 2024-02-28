import { ActionFunctionArgs, defer } from 'react-router-dom';
import { getTheaterById } from '../../client/theaters/theaters.client';

export const theaterLoader = async (args: ActionFunctionArgs) => {
    const { params } = args;
    const { theaterId } = params;

    const theaterPromise = getTheaterById(Number(theaterId));

    return defer({ theater: theaterPromise });
};

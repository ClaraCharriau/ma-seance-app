import { ActionFunctionArgs } from 'react-router-dom';
import { getTheaterById } from '../../client/theaters/theaters.client';

export const theaterLoader = async (args: ActionFunctionArgs) => {
    const { params } = args;
    const { id } = params;
    return await getTheaterById(Number(id));
};

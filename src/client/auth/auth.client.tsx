import { AxiosResponse } from 'axios';
import { User } from '../../models/User';
import { axiosInstance } from '../axios.config';

const TOKEN_PATH = '/token';
const REGISTRATIONS_PATH = '/registrations';

export const checkAccountExists = async (email: string): Promise<{ exists: boolean }> => {
    return await axiosInstance.post(TOKEN_PATH, {
        email: email
    });
};

export const loginUser = async (email: string, password: string): Promise<User> => {
    return await axiosInstance.post(REGISTRATIONS_PATH, {
        email: email,
        password: password
    });
};

export const signIn = async (pseudo: string, email: string, password: string): Promise<User> => {
    return await axiosInstance.post(REGISTRATIONS_PATH, {
        pseudo: pseudo,
        email: email,
        password: password
    });
};

export const updateAccount = async (pseudo: string, email: string, password: string): Promise<User> => {
    return await axiosInstance.patch(REGISTRATIONS_PATH, {
        pseudo: pseudo,
        email: email,
        password: password
    });
};

export const deleteAccount = async (id: string): Promise<AxiosResponse<any, any>> => {
    return await axiosInstance.delete(REGISTRATIONS_PATH + '/' + id);
};

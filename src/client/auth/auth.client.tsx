import { AxiosResponse } from 'axios';
import { User } from '../../models/User';
import { axiosInstance } from '../axios.config';
import config from '../../config/config.helper';
import { UserToken } from '../../models/UserToken';

const AUTH_VERIFY_PATH = config.services.auth.verify;
const AUTH_LOGIN_PATH = config.services.auth.login;
const AUTH_REGISTRATIONS_PATH = config.services.auth.registrations;

export const checkAccountExists = async (email: string): Promise<{ isExistingAccount: boolean }> => {
    return await axiosInstance.post(AUTH_VERIFY_PATH, {
        email
    });
};

export const loginUser = async (email: string, password: string): Promise<UserToken> => {
    return await axiosInstance.post(AUTH_LOGIN_PATH, {
        email,
        password
    });
};

export const signIn = async (pseudo: string, email: string, password: string): Promise<User> => {
    return await axiosInstance.post(AUTH_REGISTRATIONS_PATH, {
        pseudo,
        email,
        password
    });
};

export const updateAccount = async (id: string, pseudo: string, email: string, password: string): Promise<User> => {
    return await axiosInstance.patch(AUTH_REGISTRATIONS_PATH + '/' + id, {
        id,
        pseudo,
        email,
        password
    });
};

export const deleteAccount = async (id: string): Promise<AxiosResponse<any, any>> => {
    return await axiosInstance.delete(AUTH_REGISTRATIONS_PATH + '/' + id);
};

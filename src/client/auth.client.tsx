/* eslint-disable  @typescript-eslint/no-explicit-any */
import { User } from '../models/User';
import axios, { AxiosResponse } from 'axios';
import { handleDeleteResponse, handleError, handleResponse } from './client.utils';

const host = 'http://localhost:7878';
const user_auth_path = host + '/auth';
const user_verify_path = host + '/verify';
const user_sign_in_path = host + '/sign-in';
const user_sign_out_path = host + '/sign-out';

export const loginUser = async (email: string, password: string): Promise<User> => {
    return await axios
        .post(user_auth_path, {
            email: email,
            password: password
        })
        .then(response => handleResponse(response))
        .catch(error => handleError(error, 'POST /auth'));
};

export const checkAccountExists = async (email: string): Promise<boolean> => {
    return await axios
        .post(user_verify_path, {
            email: email
        })
        .then(response => {
            console.log('user-verify-client-response POST verify :', response.data);
            if (response.data && typeof response.data.exists === 'boolean') {
                return response.data.exists;
            }
            throw Error('Could not parse api /verify response. ');
        })
        .catch(error => handleError(error, 'POST /verify'));
};

export const signIn = async (pseudo: string, email: string, password: string): Promise<User> => {
    return await axios
        .post(user_sign_in_path, {
            pseudo: pseudo,
            email: email,
            password: password
        })
        .then(response => handleResponse(response))
        .catch(error => handleError(error, 'POST /sign-in'));
};

export const updateAccount = async (pseudo: string, email: string, password: string): Promise<User> => {
    return await axios
        .patch(user_sign_in_path, {
            pseudo: pseudo,
            email: email,
            password: password
        })
        .then(response => handleResponse(response))
        .catch(error => handleError(error, 'PATCH /sign-in'));
};

export const deleteAccount = async (id: number): Promise<AxiosResponse<any, any>> => {
    return await axios
        .delete(user_sign_out_path + '/' + id)
        .then(response => handleDeleteResponse(response))
        .catch(error => handleError(error, 'DELETE /sign-out'));
};

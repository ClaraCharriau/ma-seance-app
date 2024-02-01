import { User } from '../models/User';
import axios from 'axios';

const user_auth_path = 'http://localhost:7878/auth';
const user_verify_path = 'http://localhost:7878/verify';
const user_sign_in_path = 'http://localhost:7878/sign-in';
const user_sign_out_path = 'http://localhost:7878/sign-out';

export const loginUser = async (email: string, password: string): Promise<User> => {
    return await axios
        .post(user_auth_path, {
            email: email,
            password: password
        })
        .then(response => {
            console.log('user-auth-client-response POST user :', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error: could not log user : ' + error.message);
            throw error;
        });
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
        .catch(error => {
            console.error('Error: could not verify if user exists' + error.message);
            throw error;
        });
};

export const signIn = async (pseudo: string, email: string, password: string): Promise<User> => {
    return await axios
        .post(user_sign_in_path, {
            pseudo: pseudo,
            email: email,
            password: password
        })
        .then(response => {
            console.log('user-sign-in-client-response POST user :', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error: could not sign in user' + error.message);
            throw error;
        });
};

export const updateAccount = async (pseudo: string, email: string, password: string): Promise<User> => {
    return await axios
        .patch(user_sign_in_path, {
            pseudo: pseudo,
            email: email,
            password: password
        })
        .then(response => {
            console.log('user-sign-in-client-response PATCH user :', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error: could not update user' + error.message);
            throw error;
        });
};

export const deleteAccount = async (id: number) => {
    return await axios
        .delete(user_sign_out_path + '/' + id)
        .then(response => {
            console.log('user-auth-client-response DELETE user :', response);
            return response;
        })
        .catch(error => {
            console.error('Error: could DELETE user' + error.message);
            throw error;
        });
};

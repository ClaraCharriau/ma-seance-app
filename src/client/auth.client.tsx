import { User } from '../models/User';
import axios from 'axios';

const user_auth_path = 'http://localhost:7878/auth';
const user_verify_path = 'http://localhost:7878/verify';
const user_sign_in_path = 'http://localhost:7878/sign-in';

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
        .then(function (response) {
            console.log('user-verify-client-response POST verify :', response.data);
            if (response.data && typeof response.data.exists === 'boolean') {
                return response.data.exists;
            }
            throw Error('Could not parse api /verify response. ');
        })
        .catch(function (error: Error) {
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
        .then(function (response) {
            console.log('user-sign-in-client-response POST user :', response.data);
            return response.data;
        })
        .catch(function (error: Error) {
            console.error('Error: could not sign in user' + error.message);
            throw error;
        });
};

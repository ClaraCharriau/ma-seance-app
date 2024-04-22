import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import config from '../config/config.helper';
import { UserToken } from '../model/UserToken';

/**
 * Set axios global configuration
 */
export const axiosInstance = axios.create({
    baseURL: config.services.prefix,
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Set authentication header if token is found
 */
axiosInstance.interceptors.request.use(config => {
    const maSeanceIdToken = localStorage.getItem('maSeanceId');
    if (maSeanceIdToken) {
        const parsedUsertoken: UserToken = JSON.parse(maSeanceIdToken);
        config.headers.Authorization = `Bearer ${parsedUsertoken.access_token}`;
    }
    return config;
});

/**
 * Set global behavior for responses
 */
axiosInstance.interceptors.response.use(
    response => handleResponse(response),
    error => handleError(error)
);

export const handleError = (error: any) => {
    if (error.response.status === 401 || error.response.status === 403) {
        throw new Response(error.response.data, {
            status: error.response.status,
            statusText: error.response.statusText
        });
    }
    toast.error("Une erreur s'est produite.");
    if (error.response) {
        throw new Response(error.response.data, {
            status: error.response.status,
            statusText: error.response.statusText
        });
    }
};

export const handleResponse = (response: AxiosResponse) => {
    return response.data;
};

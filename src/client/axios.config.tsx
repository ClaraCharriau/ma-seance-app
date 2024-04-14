import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import config from '../config/config.helper';

export const axiosInstance = axios.create({
    baseURL: config.services.prefix
});

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

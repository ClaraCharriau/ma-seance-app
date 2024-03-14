/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosResponse } from 'axios';
import config from '../config/config.helper';

export const axiosInstance = axios.create({
    baseURL: config.services.prefix
});

axiosInstance.interceptors.response.use(
    response => handleResponse(response),
    (error: AxiosError) => handleError(error)
);

export const handleError = (error: any) => {
    if (error.response) {
        throw new Response(error.response.data, {
            status: error.response.status,
            statusText: error.response.statusText
        });
    }
    console.error(error.message);
    throw error;
};

export const handleResponse = (response: AxiosResponse) => {
    return response.data;
};

import { AxiosResponse } from 'axios';

export const handleError = (error: Error, customMessage?: string) => {
    console.error(`Error: ${customMessage}`, error.message);
    throw error;
};

export const handleResponse = (response: AxiosResponse) => {
    return response.data;
};

export const handleDeleteResponse = (response: AxiosResponse) => {
    return response;
};

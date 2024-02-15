import { AxiosResponse } from 'axios';
import { Movie } from '../models/Movie';

export interface PaginatedMovieResponse {
    _metadata: {
        page: number;
        per_page: number;
        page_count: number;
        total_count: number;
    };
    records: Movie[];
}

export const HOST = 'http://localhost:7878';

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

export const handleDeleteResponse = (response: AxiosResponse) => {
    return response;
};

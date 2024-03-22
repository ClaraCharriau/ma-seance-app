/* eslint-disable  @typescript-eslint/no-explicit-any */
import MockAdapter from 'axios-mock-adapter';
import mockFavMoviesList from '../../mocks/users/fav-movies.json';
import mockShowtime from '../../mocks/showtimes/showtimes.json';
import mockUserShowtimes from '../../mocks/users/user-showtimes.json';
import { Theater } from '../../models/Theater';
import { axiosInstance } from '../axios.config';
import {
    deleteUserFavTheater,
    getUserAgenda,
    getUserFavMovies,
    getUserFavTheaters,
    updateUserAgenda,
    updateUserFavMovies,
    updateUserFavTheaters
} from './user.client';

describe('User client tests', () => {
    let axiosMock: MockAdapter;
    const axiosGet = jest.spyOn(axiosInstance, 'get');
    const axiosPatch = jest.spyOn(axiosInstance, 'patch');
    const axiosDelete = jest.spyOn(axiosInstance, 'delete');
    const mockTheaterList: Theater[] = [
        {
            id: '1',
            name: 'C2L Saint-Germain',
            address: '25-27-29, rue du Vieux-Marche 78100 Saint-Germain-en-Laye',
            imgPath: '/c2l-saint-germain'
        },
        {
            id: '2',
            name: 'C2L Poissy',
            address: '112 Rue du Général de Gaulle 78300 Poissy',
            imgPath: '/c2l-poissy'
        }
    ];

    beforeEach(() => {
        axiosMock = new MockAdapter(axiosInstance);
    });
    afterEach(() => {
        axiosMock.reset();
    });

    it('should get user favorite theaters successfully', async () => {
        // Given
        axiosMock.onGet('/users/1/fav-theaters').reply(200, mockTheaterList);

        // When
        const response = await getUserFavTheaters('1');

        // Then
        expect(axiosGet).toHaveBeenCalledWith('/users/1/fav-theaters');
        expect(response).toEqual([
            {
                id: '1',
                name: 'C2L Saint-Germain',
                address: '25-27-29, rue du Vieux-Marche 78100 Saint-Germain-en-Laye',
                imgPath: '/c2l-saint-germain'
            },
            {
                id: '2',
                name: 'C2L Poissy',
                address: '112 Rue du Général de Gaulle 78300 Poissy',
                imgPath: '/c2l-poissy'
            }
        ]);
    });

    it('should fail to get user favorite theaters', async () => {
        // Given
        axiosMock.onGet('/users/1/fav-theaters').reply(500, {});
        let response = {};

        // When
        try {
            response = await getUserFavTheaters('1');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
            expect(response).toEqual({});
        }
        expect(axiosGet).toHaveBeenCalledWith('/users/1/fav-theaters');
    });

    it('should update user favorite theaters successfully', async () => {
        // Given
        axiosMock.onPatch('/users/2/fav-theaters/3').reply(200);

        // When
        await updateUserFavTheaters('2', '3');

        // Then
        expect(axiosPatch).toHaveBeenCalledWith('/users/2/fav-theaters/3');
    });

    it('should fail to update user favorite theaters', async () => {
        // Given
        axiosMock.onPatch('/users/2/fav-theaters/2').reply(500);

        // When
        try {
            await updateUserFavTheaters('2', '2');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
        }
        expect(axiosPatch).toHaveBeenCalledWith('/users/2/fav-theaters/2');
    });

    it('should delete user favorite theaters successfully', async () => {
        // Given
        axiosMock.onDelete('/users/2/fav-theaters/3').reply(200);

        // When
        await deleteUserFavTheater('2', '3');

        // Then
        expect(axiosDelete).toHaveBeenCalledWith('/users/2/fav-theaters/3');
    });

    it('should fail to delete user favorite theaters', async () => {
        // Given
        axiosMock.onDelete('/users/2/fav-theaters/2').reply(500);

        // When
        try {
            await deleteUserFavTheater('2', '2');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
        }
        expect(axiosDelete).toHaveBeenCalledWith('/users/2/fav-theaters/2');
    });

    it('should get user favorite movies successfully', async () => {
        // Given
        axiosMock.onGet('/users/1/fav-movies').reply(200, mockFavMoviesList);

        // When
        const response = await getUserFavMovies('1');

        // Then
        expect(axiosGet).toHaveBeenCalledWith('/users/1/fav-movies');
        expect(response).toEqual(mockFavMoviesList);
    });

    it('should fail to get user favorite movies', async () => {
        // Given
        axiosMock.onGet('/users/1/fav-movies').reply(500);
        let response = {};

        // When
        try {
            response = await getUserFavMovies('1');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
            expect(response).toEqual({});
        }
        expect(axiosGet).toHaveBeenCalledWith('/users/1/fav-movies');
    });

    it('should update user favorite movies successfully', async () => {
        // Given
        axiosMock.onPatch('/users/2/fav-movies/3').reply(200);

        // When
        await updateUserFavMovies('2', '3');

        // Then
        expect(axiosPatch).toHaveBeenCalledWith('/users/2/fav-movies/3');
    });

    it('should fail to update user favorite movies', async () => {
        // Given
        axiosMock.onPatch('/users/2/fav-movies/2').reply(500);

        // When
        try {
            await updateUserFavMovies('2', '2');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
        }
        expect(axiosPatch).toHaveBeenCalledWith('/users/2/fav-movies/2');
    });

    it('should get user showtimes successfully', async () => {
        // Given
        axiosMock.onGet('/users/2/showtimes').reply(200, mockUserShowtimes);

        // When
        const response = await getUserAgenda('2');

        // Then
        expect(response).toEqual(mockUserShowtimes);
        expect(axiosGet).toHaveBeenCalledWith('/users/2/showtimes');
    });

    it('should fail to get user showtimes', async () => {
        // Given
        axiosMock.onGet('/users/2/showtimes').reply(500);

        // When
        try {
            await getUserAgenda('2');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
        }
        expect(axiosGet).toHaveBeenCalledWith('/users/2/showtimes');
    });

    it('should update user showtimes successfully', async () => {
        // Given
        axiosMock.onPatch('/users/2/showtimes').reply(200, mockUserShowtimes);

        // When
        const response = await updateUserAgenda('2', mockShowtime);

        // Then
        expect(response).toEqual(mockUserShowtimes);
        expect(axiosPatch).toHaveBeenCalledWith('/users/2/showtimes', mockShowtime);
    });

    it('should fail to update user showtimes', async () => {
        // Given
        axiosMock.onPatch('/users/2/showtimes').reply(500);

        // When
        try {
            await updateUserAgenda('2', mockShowtime);
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
        }
        expect(axiosPatch).toHaveBeenCalledWith('/users/2/showtimes', mockShowtime);
    });
});

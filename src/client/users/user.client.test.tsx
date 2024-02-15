/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Theater } from '../../models/Theater';
import { getUserFavMovies, getUserFavTheaters, updateUserFavMovies, updateUserFavTheaters } from './user.client';
import mockMoviesList from '../../mocks/movies/fav-movies.json';

describe('User client tests', () => {
    let axiosMock: MockAdapter;
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
        axiosMock = new MockAdapter(axios);
    });
    afterEach(() => {
        axiosMock.reset();
    });

    it('should get user favorite theaters successfully', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/users/1/fav-theaters').reply(200, mockTheaterList);
        const axiosGet = jest.spyOn(require('axios'), 'get');

        // When
        const response = await getUserFavTheaters(1);

        // Then
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/users/1/fav-theaters');
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
        axiosMock.onGet('http://localhost:7878/users/1/fav-theaters').reply(500, {});
        let response = {};
        const axiosGet = jest.spyOn(require('axios'), 'get');

        // When
        try {
            response = await getUserFavTheaters(1);
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
            expect(response).toEqual({});
        }
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/users/1/fav-theaters');
    });

    it('should update user favorite theaters successfully', async () => {
        // Given
        axiosMock.onPatch('http://localhost:7878/users/2/fav-theaters').reply(200);
        const axiosPatch = jest.spyOn(require('axios'), 'patch');

        // When
        await updateUserFavTheaters(2, '3');

        // Then
        expect(axiosPatch).toHaveBeenCalledWith('http://localhost:7878/users/2/fav-theaters', '3');
    });

    it('should fail to update user favorite theaters', async () => {
        // Given
        axiosMock.onPatch('http://localhost:7878/users/2/fav-theaters').reply(500);
        const axiosPatch = jest.spyOn(require('axios'), 'patch');

        // When
        try {
            await updateUserFavTheaters(2, '2');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
        }
        expect(axiosPatch).toHaveBeenCalledWith('http://localhost:7878/users/2/fav-theaters', '2');
    });

    it('should get user favorite movies successfully', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/users/1/fav-movies').reply(200, mockMoviesList);
        const axiosGet = jest.spyOn(require('axios'), 'get');

        // When
        const response = await getUserFavMovies(1);

        // Then
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/users/1/fav-movies');
        expect(response).toEqual(mockMoviesList);
    });

    it('should fail to get user favorite movies', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/users/1/fav-movies').reply(500);
        let response = {};
        const axiosGet = jest.spyOn(require('axios'), 'get');

        // When
        try {
            response = await getUserFavMovies(1);
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
            expect(response).toEqual({});
        }
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/users/1/fav-movies');
    });

    it('should update user favorite movies successfully', async () => {
        // Given
        axiosMock.onPatch('http://localhost:7878/users/2/fav-movies').reply(200);
        const axiosPatch = jest.spyOn(require('axios'), 'patch');

        // When
        await updateUserFavMovies(2, '3');

        // Then
        expect(axiosPatch).toHaveBeenCalledWith('http://localhost:7878/users/2/fav-movies', '3');
    });

    it('should fail to update user favorite movies', async () => {
        // Given
        axiosMock.onPatch('http://localhost:7878/users/2/fav-movies').reply(500);
        const axiosPatch = jest.spyOn(require('axios'), 'patch');

        // When
        try {
            await updateUserFavMovies(2, '2');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
        }
        expect(axiosPatch).toHaveBeenCalledWith('http://localhost:7878/users/2/fav-movies', '2');
    });
});

export {};

/* eslint-disable  @typescript-eslint/no-explicit-any */
import MockAdapter from 'axios-mock-adapter';
import mockFavMoviesList from '../../mock/users/fav-movies.json';
import mockScreening from '../../mock/screenings/screenings.json';
import mockUserScreenings from '../../mock/users/user-showtimes.json';
import { Theater } from '../../model/Theater';
import { axiosInstance } from '../axios.config';
import {
    deleteUserFavTheater,
    getUserScreenings,
    getUserFavMovies,
    getUserFavTheaters,
    addToUserScreenings,
    addToUserFavMovies,
    addToUserFavTheaters
} from './user.client';

describe('User client tests', () => {
    let axiosMock: MockAdapter;
    const axiosGet = jest.spyOn(axiosInstance, 'get');
    const axiosPost = jest.spyOn(axiosInstance, 'post');
    const axiosDelete = jest.spyOn(axiosInstance, 'delete');
    const mockTheaterList: Theater[] = [
        {
            id: '1',
            name: 'C2L Saint-Germain',
            address: '25-27-29, rue du Vieux-Marche 78100 Saint-Germain-en-Laye',
            imagePath: '/c2l-saint-germain',
            bookingPath: 'ugc.fr'
        },
        {
            id: '2',
            name: 'C2L Poissy',
            address: '112 Rue du Général de Gaulle 78300 Poissy',
            imagePath: '/c2l-poissy',
            bookingPath: 'ugc.com'
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
        axiosMock.onGet('http://localhost:7878/users/1/fav-theaters').reply(200, mockTheaterList);

        // When
        const response = await getUserFavTheaters('1');

        // Then
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/users/1/fav-theaters');
        expect(response).toEqual([
            {
                id: '1',
                name: 'C2L Saint-Germain',
                address: '25-27-29, rue du Vieux-Marche 78100 Saint-Germain-en-Laye',
                imagePath: '/c2l-saint-germain',
                bookingPath: 'ugc.fr'
            },
            {
                id: '2',
                name: 'C2L Poissy',
                address: '112 Rue du Général de Gaulle 78300 Poissy',
                imagePath: '/c2l-poissy',
                bookingPath: 'ugc.com'
            }
        ]);
    });

    it('should fail to get user favorite theaters', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/users/1/fav-theaters').reply(500, {});
        let response = {};

        // When
        try {
            response = await getUserFavTheaters('1');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
            expect(response).toEqual({});
        }
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/users/1/fav-theaters');
    });

    it('should update user favorite theaters successfully', async () => {
        // Given
        axiosMock.onPost('http://localhost:7878/users/2/fav-theaters/3').reply(200);

        // When
        await addToUserFavTheaters('2', '3');

        // Then
        expect(axiosPost).toHaveBeenCalledWith('http://localhost:7878/users/2/fav-theaters/3');
    });

    it('should fail to update user favorite theaters', async () => {
        // Given
        axiosMock.onPost('http://localhost:7878/users/2/fav-theaters/2').reply(500);

        // When
        try {
            await addToUserFavTheaters('2', '2');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
        }
        expect(axiosPost).toHaveBeenCalledWith('http://localhost:7878/users/2/fav-theaters/2');
    });

    it('should delete user favorite theaters successfully', async () => {
        // Given
        axiosMock.onDelete('http://localhost:7878/users/2/fav-theaters/3').reply(200);

        // When
        await deleteUserFavTheater('2', '3');

        // Then
        expect(axiosDelete).toHaveBeenCalledWith('http://localhost:7878/users/2/fav-theaters/3');
    });

    it('should fail to delete user favorite theaters', async () => {
        // Given
        axiosMock.onDelete('http://localhost:7878/users/2/fav-theaters/2').reply(500);

        // When
        try {
            await deleteUserFavTheater('2', '2');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
        }
        expect(axiosDelete).toHaveBeenCalledWith('http://localhost:7878/users/2/fav-theaters/2');
    });

    it('should get user favorite movies successfully', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/users/1/fav-movies').reply(200, mockFavMoviesList);

        // When
        const response = await getUserFavMovies('1');

        // Then
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/users/1/fav-movies');
        expect(response).toEqual(mockFavMoviesList);
    });

    it('should fail to get user favorite movies', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/users/1/fav-movies').reply(500);
        let response = {};

        // When
        try {
            response = await getUserFavMovies('1');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
            expect(response).toEqual({});
        }
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/users/1/fav-movies');
    });

    it('should update user favorite movies successfully', async () => {
        // Given
        axiosMock.onPost('http://localhost:7878/users/2/fav-movies/3').reply(200);

        // When
        await addToUserFavMovies('2', '3');

        // Then
        expect(axiosPost).toHaveBeenCalledWith('http://localhost:7878/users/2/fav-movies/3');
    });

    it('should fail to update user favorite movies', async () => {
        // Given
        axiosMock.onPost('http://localhost:7878/users/2/fav-movies/2').reply(500);

        // When
        try {
            await addToUserFavMovies('2', '2');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
        }
        expect(axiosPost).toHaveBeenCalledWith('http://localhost:7878/users/2/fav-movies/2');
    });

    it('should get user screenings successfully', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/users/2/screenings').reply(200, mockUserScreenings);

        // When
        const response = await getUserScreenings('2');

        // Then
        expect(response).toEqual(mockUserScreenings);
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/users/2/screenings');
    });

    it('should fail to get user screenings', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/users/2/screenings').reply(500);

        // When
        try {
            await getUserScreenings('2');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
        }
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/users/2/screenings');
    });

    it('should update user screenings successfully', async () => {
        // Given
        axiosMock.onPost('http://localhost:7878/users/2/screenings/caadad78-7daf-4c49-abe8-2514b43884f6').reply(200, mockUserScreenings);

        // When
        const response = await addToUserScreenings('2', mockScreening);

        // Then
        expect(response).toEqual(mockUserScreenings);
        expect(axiosPost).toHaveBeenCalledWith('http://localhost:7878/users/2/screenings/caadad78-7daf-4c49-abe8-2514b43884f6');
    });

    it('should fail to update user screenings', async () => {
        // Given
        axiosMock.onPost('http://localhost:7878/users/2/screenings/caadad78-7daf-4c49-abe8-2514b43884f6').reply(500);

        // When
        try {
            await addToUserScreenings('2', mockScreening);
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
        }
        expect(axiosPost).toHaveBeenCalledWith('http://localhost:7878/users/2/screenings/caadad78-7daf-4c49-abe8-2514b43884f6');
    });
});

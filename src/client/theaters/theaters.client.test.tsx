/* eslint-disable  @typescript-eslint/no-explicit-any */
import MockAdapter from 'axios-mock-adapter';
import mockMovieScreenings from '../../mocks/theaters/movies-screenings-by-theater-id-and-day-1.json';
import mockMovies from '../../mocks/theaters/theater-movies.json';
import { Theater } from '../../models/Theater';
import { axiosInstance } from '../axios.config';
import { getMovieScreeningsByTheaterIdAndDay, getTheaterById, getTheaterMoviesByTheaterId } from './theaters.client';

describe('Theaters client tests', () => {
    let axiosMock: MockAdapter;
    const axiosGet = jest.spyOn(axiosInstance, 'get');
    const mockTheaters: Theater[] = [
        {
            id: '1',
            name: 'C2L Saint-Germain',
            address: '25-27-29, rue du Vieux-Marche 78100 Saint-Germain-en-Laye',
            imgPath: '/c2l-saint-germain',
            bookingPath: ''
        }
    ];

    beforeEach(() => {
        axiosMock = new MockAdapter(axiosInstance);
    });
    afterEach(() => {
        axiosMock.reset();
    });

    it('should get theater successfully', async () => {
        // Given
        axiosMock.onGet('/theaters/1').reply(200, mockTheaters);

        // When
        const response = await getTheaterById('1');

        // Then
        expect(response).toEqual([
            {
                id: '1',
                name: 'C2L Saint-Germain',
                address: '25-27-29, rue du Vieux-Marche 78100 Saint-Germain-en-Laye',
                imgPath: '/c2l-saint-germain',
                bookingPath: ''
            }
        ]);
        expect(axiosGet).toHaveBeenCalledWith('/theaters/1');
    });

    it('should fail to get theater', async () => {
        // Given
        axiosMock.onGet('/theaters/1').reply(500, {});
        let response = {};

        // When
        try {
            response = await getTheaterById('1');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
            expect(response).toEqual({});
        }
        expect(axiosGet).toHaveBeenCalledWith('/theaters/1');
    });

    it('should get theater movies successfully', async () => {
        // Given
        axiosMock.onGet('/theaters/1/movies').reply(200, mockMovies);

        // When
        const response = await getTheaterMoviesByTheaterId('1');

        // Then
        expect(response).toEqual(mockMovies);
        expect(axiosGet).toHaveBeenCalledWith('/theaters/1/movies');
    });

    it('should fail to get theater movies', async () => {
        // Given
        axiosMock.onGet('/theaters/1/movies').reply(500);
        let response = {};

        // When
        try {
            response = await getTheaterMoviesByTheaterId('1');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
            expect(response).toEqual({});
        }
        expect(axiosGet).toHaveBeenCalledWith('/theaters/1/movies');
    });

    it('should get movie screenings successfully', async () => {
        // Given
        axiosMock.onGet('/theaters/1/screenings').reply(200, mockMovieScreenings);

        // When
        const response = await getMovieScreeningsByTheaterIdAndDay('1', '2');

        // Then
        expect(response).toEqual(mockMovieScreenings);
        expect(axiosGet).toHaveBeenCalledWith('/theaters/1/screenings', {
            params: { day: '2' }
        });
    });

    it('should fail to get movie screenings', async () => {
        // Given
        axiosMock.onGet('/theaters/1/screenings').reply(500);

        // When
        try {
            await getMovieScreeningsByTheaterIdAndDay('1', '2');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
        }
        expect(axiosGet).toHaveBeenCalledWith('/theaters/1/screenings', {
            params: { day: '2' }
        });
    });
});

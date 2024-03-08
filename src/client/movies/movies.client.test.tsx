/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getCurrentlyMovies, getMovieById, getTheaterScreeningsByMovieIdAndDay } from './movies.client';
import mockMovies from '../../mocks/movies/current-movies.json';
import mockMovie from '../../mocks/movies/movie-1.json';
import mockTheaterScreenings from '../../mocks/movies/theaters-screenings-by-movie-id-and-day-1.json';

describe('Movies client tests', () => {
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
    });
    afterEach(() => {
        axiosMock.reset();
    });

    it('should get currently playing movies successfully', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/movies/currently').reply(200, mockMovies);
        const axiosGet = jest.spyOn(require('axios'), 'get');

        // When
        const response = await getCurrentlyMovies();

        // Then
        expect(response).toEqual(mockMovies);
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/movies/currently');
    });

    it('should fail to get currently playing movies', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/movies/currently').reply(500, {});
        const axiosGet = jest.spyOn(require('axios'), 'get');
        let response = {};

        // When
        try {
            response = await getCurrentlyMovies();
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
            expect(response).toEqual({});
        }
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/movies/currently');
    });

    it('should get movie successfully', async () => {
        // Given
        const movieId = '3d8f1342-15f1-44b1-a48f-4581d654b94a';
        axiosMock.onGet('http://localhost:7878/movies/' + movieId).reply(200, mockMovie);
        const axiosGet = jest.spyOn(require('axios'), 'get');

        // When
        const response = await getMovieById(movieId);

        // Then
        expect(response).toEqual(mockMovie);
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/movies/' + movieId);
    });

    it('should fail to get movie', async () => {
        // Given
        const movieId = '3d8f1342-15f1-44b1-a48f-4581d654b94a';
        axiosMock.onGet('http://localhost:7878/movies/' + movieId).reply(500, {});
        const axiosGet = jest.spyOn(require('axios'), 'get');
        let response = {};

        // When
        try {
            response = await getMovieById(movieId);
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
            expect(response).toEqual({});
        }
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/movies/' + movieId);
    });

    it('should get theater screenings successfully', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/movies/1/screenings').reply(200, mockTheaterScreenings);
        const axiosGet = jest.spyOn(require('axios'), 'get');

        // When
        const response = await getTheaterScreeningsByMovieIdAndDay('1', '2');

        // Then
        expect(response).toEqual(mockTheaterScreenings);
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/movies/1/screenings', {
            params: { day: '2' }
        });
    });

    it('should fail to get theater screenings', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/movies/1/screenings').reply(500);
        const axiosGet = jest.spyOn(require('axios'), 'get');

        // When
        try {
            await getTheaterScreeningsByMovieIdAndDay('1', '2');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
        }
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/movies/1/screenings', {
            params: { day: '2' }
        });
    });
});

export {};

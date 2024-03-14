/* eslint-disable  @typescript-eslint/no-explicit-any */
import MockAdapter from 'axios-mock-adapter';
import mockMovies from '../../mocks/movies/current-movies.json';
import mockMovie from '../../mocks/movies/movie-1.json';
import mockTheaterScreenings from '../../mocks/movies/theaters-screenings-by-movie-id-and-day-1.json';
import { axiosInstance } from '../axios.config';
import { getCurrentlyMovies, getMovieById, getTheaterScreeningsByMovieIdAndDay } from './movies.client';

describe('Movies client tests', () => {
    let axiosMock: MockAdapter;
    const axiosGet = jest.spyOn(axiosInstance, 'get');

    beforeEach(() => {
        axiosMock = new MockAdapter(axiosInstance);
    });
    afterEach(() => {
        axiosMock.reset();
    });

    it('should get currently playing movies successfully', async () => {
        // Given
        axiosMock.onGet('/movies/currently').reply(200, mockMovies);

        // When
        const response = await getCurrentlyMovies();

        // Then
        expect(response).toEqual(mockMovies);
        expect(axiosGet).toHaveBeenCalledWith('/movies/currently');
    });

    it('should fail to get currently playing movies', async () => {
        // Given
        axiosMock.onGet('/movies/currently').reply(500, {});
        let response = {};

        // When
        try {
            response = await getCurrentlyMovies();
        } catch (error: any) {
            // Then
            expect(error.status).toBe(500);
            expect(response).toEqual({});
        }
        expect(axiosGet).toHaveBeenCalledWith('/movies/currently');
    });

    it('should get movie successfully', async () => {
        // Given
        const movieId = '3d8f1342-15f1-44b1-a48f-4581d654b94a';
        axiosMock.onGet('/movies/' + movieId).reply(200, mockMovie);

        // When
        const response = await getMovieById(movieId);

        // Then
        expect(response).toEqual(mockMovie);
        expect(axiosGet).toHaveBeenCalledWith('/movies/' + movieId);
    });

    it('should fail to get movie', async () => {
        // Given
        const movieId = '3d8f1342-15f1-44b1-a48f-4581d654b94a';
        axiosMock.onGet('/movies/' + movieId).reply(500, {});
        let response = {};

        // When
        try {
            response = await getMovieById(movieId);
        } catch (error: any) {
            // Then
            expect(error.status).toBe(500);
            expect(response).toEqual({});
        }
        expect(axiosGet).toHaveBeenCalledWith('/movies/' + movieId);
    });

    it('should get theater screenings successfully', async () => {
        // Given
        axiosMock.onGet('/movies/1/screenings').reply(200, mockTheaterScreenings);

        // When
        const response = await getTheaterScreeningsByMovieIdAndDay('1', '2');

        // Then
        expect(response).toEqual(mockTheaterScreenings);
        expect(axiosGet).toHaveBeenCalledWith('/movies/1/screenings', {
            params: { day: '2' }
        });
    });

    it('should fail to get theater screenings', async () => {
        // Given
        axiosMock.onGet('/movies/1/screenings').reply(500);

        // When
        try {
            await getTheaterScreeningsByMovieIdAndDay('1', '2');
        } catch (error: any) {
            // Then
            expect(error.status).toBe(500);
        }
        expect(axiosGet).toHaveBeenCalledWith('/movies/1/screenings', {
            params: { day: '2' }
        });
    });
});

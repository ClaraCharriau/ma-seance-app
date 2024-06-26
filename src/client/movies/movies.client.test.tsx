/* eslint-disable  @typescript-eslint/no-explicit-any */
import MockAdapter from 'axios-mock-adapter';
import mockMovies from '../../mock/movies/current-movies.json';
import mockMovie from '../../mock/movies/movie-1.json';
import mockTheaterScreenings from '../../mock/movies/theaters-screenings-by-movie-id-and-day-1.json';
import { axiosInstance } from '../axios.config';
import { getCurrentlyMovies, getMovieById, getTheaterScreeningsByMovieIdAndDayAndUserId } from './movies.client';

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
        axiosMock.onGet('http://localhost:7878/movies/currently').reply(200, mockMovies);

        // When
        const response = await getCurrentlyMovies();

        // Then
        expect(response).toEqual(mockMovies);
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/movies/currently');
    });

    it('should fail to get currently playing movies', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/movies/currently').reply(500, {});
        let response = {};

        // When
        try {
            response = await getCurrentlyMovies();
        } catch (error: any) {
            // Then
            expect(error.status).toBe(500);
            expect(response).toEqual({});
        }
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/movies/currently');
    });

    it('should get movie successfully', async () => {
        // Given
        const movieId = '3d8f1342-15f1-44b1-a48f-4581d654b94a';
        axiosMock.onGet('http://localhost:7878/movies/' + movieId + '?extended_infos=true').reply(200, mockMovie);

        // When
        const response = await getMovieById(movieId);

        // Then
        expect(response).toEqual(mockMovie);
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/movies/' + movieId + '?extended_infos=true');
    });

    it('should fail to get movie', async () => {
        // Given
        const movieId = '3d8f1342-15f1-44b1-a48f-4581d654b94a';
        axiosMock.onGet('http://localhost:7878/movies/' + movieId + '?extended_infos=true').reply(500, {});
        let response = {};

        // When
        try {
            response = await getMovieById(movieId);
        } catch (error: any) {
            // Then
            expect(error.status).toBe(500);
            expect(response).toEqual({});
        }
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/movies/' + movieId + '?extended_infos=true');
    });

    it('should get theater screenings successfully', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/movies/1/screenings').reply(200, mockTheaterScreenings);

        // When
        const response = await getTheaterScreeningsByMovieIdAndDayAndUserId('1', '2', '1');

        // Then
        expect(response).toEqual(mockTheaterScreenings);
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/movies/1/screenings', {
            params: { day: '2', userId: '1' }
        });
    });

    it('should fail to get theater screenings', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/movies/1/screenings').reply(500);

        // When
        try {
            await getTheaterScreeningsByMovieIdAndDayAndUserId('1', '2', '1');
        } catch (error: any) {
            // Then
            expect(error.status).toBe(500);
        }
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/movies/1/screenings', {
            params: { day: '2', userId: '1' }
        });
    });
});

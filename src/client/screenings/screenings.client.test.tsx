/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockMovieScreenings from '../../mocks/screenings/movies-screenings-by-theater-id-and-day-1.json';
import mockTheaterScreenings from '../../mocks/screenings/theaters-screenings-by-movie-id-and-day-1.json'
import { getMovieScreeningsByTheaterAndDay, getTheaterScreeningsByMovieIdAndDay } from './screenings.client';

describe('Screenings client tests', () => {
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
    });
    afterEach(() => {
        axiosMock.reset();
    });

    it('should get movie screenings successfully', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/screenings/theaters/1').reply(200, mockMovieScreenings);
        const axiosGet = jest.spyOn(require('axios'), 'get');

        // When
        const response = await getMovieScreeningsByTheaterAndDay('1', '2');

        // Then
        expect(response).toEqual(mockMovieScreenings);
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/screenings/theaters/1', {
            params: { day: '2' }
        });
    });

    it('should fail to get movie screenings', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/screenings/theaters/1').reply(500);
        const axiosGet = jest.spyOn(require('axios'), 'get');

        // When
        try {
            await getMovieScreeningsByTheaterAndDay('1', '2');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
        }
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/screenings/theaters/1', {
            params: { day: '2' }
        });
    });

    it('should get theater screenings successfully', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/screenings/movies/1').reply(200, mockTheaterScreenings);
        const axiosGet = jest.spyOn(require('axios'), 'get');

        // When
        const response = await getTheaterScreeningsByMovieIdAndDay('1', '2');

        // Then
        expect(response).toEqual(mockTheaterScreenings);
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/screenings/movies/1', {
            params: { day: '2' }
        });
    });

    it('should fail to get theater screenings', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/screenings/movies/1').reply(500);
        const axiosGet = jest.spyOn(require('axios'), 'get');

        // When
        try {
            await getTheaterScreeningsByMovieIdAndDay('1', '2');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
        }
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/screenings/movies/1', {
            params: { day: '2' }
        });
    });
});

export {};

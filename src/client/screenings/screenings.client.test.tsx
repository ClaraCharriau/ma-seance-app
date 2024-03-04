/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockScreenings from '../../mocks/screenings/movies-screenings-by-theater-id-and-day-1.json';
import { getMovieScreeningsByTheaterAndDay } from './screenings.client';

describe('Screenings client tests', () => {
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
    });
    afterEach(() => {
        axiosMock.reset();
    });

    it('should get screenings successfully', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/screenings').reply(200, mockScreenings);
        const axiosGet = jest.spyOn(require('axios'), 'get');

        // When
        const response = await getMovieScreeningsByTheaterAndDay('1', '2');

        // Then
        expect(response).toEqual(mockScreenings);
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/screenings', {
            params: { day: '2', theaterId: '1' }
        });
    });

    it('should fail to get theater', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/screenings').reply(500, {});
        const axiosGet = jest.spyOn(require('axios'), 'get');
        let response = {};

        // When
        try {
            response = await getMovieScreeningsByTheaterAndDay('1', '2');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
            expect(response).toEqual({});
        }
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/screenings', {
            params: { day: '2', theaterId: '1' }
        });
    });
});

export {};

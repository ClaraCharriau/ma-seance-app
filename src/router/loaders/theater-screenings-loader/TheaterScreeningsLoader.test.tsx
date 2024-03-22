import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import mockScreenings from '../../../mocks/theaters/movies-screenings-by-theater-id-and-day-1.json';
import { theaterScreeningsLoader } from './TheaterScreeningsLoader';
import { axiosInstance } from '../../../client/axios.config';

describe('Theater screenings loader tests', () => {
    let axiosMock: MockAdapter;
    const axiosGet = jest.spyOn(axiosInstance, 'get');

    beforeEach(() => {
        axiosMock = new MockAdapter(axiosInstance);
    });
    afterEach(() => {
        axiosMock.reset();
    });
    it('should get theater screenings successfully', async () => {
        // Given
        const id = '3d8f1342-15f1-44b1-a48f-4581d654b94a';
        axiosMock.onGet('/movies/' + id + '/screenings').reply(200, mockScreenings);
        const args: any = {
            params: {
                id,
                day: 'day-4'
            }
        };

        // When
        const response = await theaterScreeningsLoader(args);

        // Then
        expect(response).toEqual(mockScreenings);
        expect(axiosGet).toHaveBeenCalledWith(
            '/movies/3d8f1342-15f1-44b1-a48f-4581d654b94a/screenings',
            { params: { day: '4' } }
        );
    });

    it('should get theater screenings successfully with a defined day', async () => {
        // Given
        const id = '3d8f1342-15f1-44b1-a48f-4581d654b94a';
        axiosMock.onGet('/movies/' + id + '/screenings').reply(200, mockScreenings);
        const args: any = {
            params: {
                id,
                day: 'day-4'
            }
        };

        // When
        const response = await theaterScreeningsLoader(args);

        // Then
        expect(response).toEqual(mockScreenings);
    });

    it('should throw error', async () => {
        // Given
        const id = undefined;
        axiosMock.onGet('/movies/' + id + '/screenings').reply(200, mockScreenings);
        const args: any = {
            params: {
                id
            }
        };

        // When
        try {
            await theaterScreeningsLoader(args);
        } catch (e: any) {
            // Then
            expect(e.status).toEqual(404);
        }
        expect(axiosGet).not.toHaveBeenCalledWith(
            '/movies/3d8f1342-15f1-44b1-a48f-4581d654b94a/screenings'
        );
    });
});

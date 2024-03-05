import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { movieScreeningsLoader } from './MovieScreeningsLoader';
import mockScreenings from '../../mocks/screenings/movies-screenings-by-theater-id-and-day-1.json';

describe('Movie screenings loader tests', () => {
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
    });
    afterEach(() => {
        axiosMock.reset();
    });
    it('should get movie screenings successfully', async () => {
        // Given
        const id = '3d8f1342-15f1-44b1-a48f-4581d654b94a';
        axiosMock.onGet('http://localhost:7878/screenings/theaters/' + id).reply(200, mockScreenings);
        const args: any = {
            params: {
                id
            }
        };

        // When
        const response = await movieScreeningsLoader(args);

        // Then
        expect(response).toEqual(mockScreenings);
    });

    it('should get movie screenings successfully with a defined day', async () => {
        // Given
        const id = '3d8f1342-15f1-44b1-a48f-4581d654b94a';
        axiosMock.onGet('http://localhost:7878/screenings/theaters/' + id).reply(200, mockScreenings);
        const args: any = {
            params: {
                id,
                day: 'day-4'
            }
        };

        // When
        const response = await movieScreeningsLoader(args);

        // Then
        expect(response).toEqual(mockScreenings);
    });

    it('should throw error', async () => {
        // Given
        const id = undefined;
        axiosMock.onGet('http://localhost:7878/screenings/theaters/' + id).reply(200, mockScreenings);
        const args: any = {
            params: {
                id
            }
        };

        // When
        try {
            await movieScreeningsLoader(args);
        } catch (e: any) {
            // Then
            expect(e.status).toEqual(404);
        }
    });
});
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../../client/axios.config';
import mockScreenings from '../../mocks/theaters/movies-screenings-by-theater-id-and-day-1.json';
import { movieScreeningsLoader } from './MovieScreeningsLoader';

describe('Movie screenings loader tests', () => {
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axiosInstance);
    });
    afterEach(() => {
        axiosMock.reset();
    });
    it('should get movie screenings successfully', async () => {
        // Given
        const id = '3d8f1342-15f1-44b1-a48f-4581d654b94a';
        axiosMock.onGet('/theaters/' + id + '/screenings').reply(200, mockScreenings);
        const args: any = {
            params: {
                id
            }
        };

        // When
        const response = await movieScreeningsLoader(args);

        // Then
        expect(response.data.movieScreenings).toEqual(mockScreenings);
    });

    it('should get movie screenings successfully with a defined day', async () => {
        // Given
        const id = '3d8f1342-15f1-44b1-a48f-4581d654b94a';
        axiosMock.onGet('/theaters/' + id + '/screenings').reply(200, mockScreenings);
        const args: any = {
            params: {
                id,
                day: 'day-4'
            }
        };

        // When
        const response = await movieScreeningsLoader(args);

        // Then
        expect(response.data.movieScreenings).toEqual(mockScreenings);
    });

    it('should throw error', async () => {
        // Given
        const id = undefined;
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
            expect(e).toEqual(Error());
        }
    });
});

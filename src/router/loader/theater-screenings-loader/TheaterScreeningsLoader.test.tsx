import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../../../client/axios.config';
import mockScreenings from '../../../mock/theaters/movies-screenings-by-theater-id-and-day-1.json';
import { theaterScreeningsLoader } from './TheaterScreeningsLoader';
import mockUser from '../../../mock/users/users.json';
import mockMovie from '../../../mock/movies/movie-1.json';

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
        axiosMock.onGet('http://localhost:7878/movies/' + id + '?extended_infos=true').reply(200, mockMovie);
        axiosMock.onGet('http://localhost:7878/movies/' + id + '/screenings').reply(200, mockScreenings);
        const args: any = {
            params: {
                id,
                day: 'day-4'
            }
        };

        // When
        const loaderFunction = theaterScreeningsLoader(mockUser);
        const response = await loaderFunction(args);

        // Then
        expect(response.data.theaterScreenings).toEqual(mockScreenings);
        expect(axiosGet).toHaveBeenCalledWith(
            'http://localhost:7878/movies/3d8f1342-15f1-44b1-a48f-4581d654b94a/screenings',
            { params: { day: '4', userId: '1' } }
        );
    });

    it('should get theater screenings successfully with a defined day', async () => {
        // Given
        const id = '3d8f1342-15f1-44b1-a48f-4581d654b94a';
        axiosMock.onGet('http://localhost:7878/movies/' + id + '?extended_infos=true').reply(200, mockMovie);
        axiosMock.onGet('http://localhost:7878/movies/' + id + '/screenings').reply(200, mockScreenings);
        const args: any = {
            params: {
                id,
                day: 'day-4'
            }
        };

        // When
        const loaderFunction = theaterScreeningsLoader(mockUser);
        const response = await loaderFunction(args);

        // Then
        expect(response.data.theaterScreenings).toEqual(mockScreenings);
    });

    it('should throw error', async () => {
        // Given
        const id = undefined;
        axiosMock.onGet('http://localhost:7878/movies/' + id + '/screenings').reply(200, mockScreenings);
        const args: any = {
            params: {
                id
            }
        };

        // When
        try {
            theaterScreeningsLoader(args);
        } catch (e: any) {
            // Then
            expect(e.status).toEqual(404);
        }
        expect(axiosGet).not.toHaveBeenCalledWith(
            'http://localhost:7878/movies/3d8f1342-15f1-44b1-a48f-4581d654b94a/screenings'
        );
    });
});

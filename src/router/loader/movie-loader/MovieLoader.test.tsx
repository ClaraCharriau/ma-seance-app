import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../../../client/axios.config';
import mockMovie from '../../../mock/movies/movie-1.json';
import { movieLoader } from './MovieLoader';

describe('Movie loader tests', () => {
    let axiosMock: MockAdapter;
    const axiosGet = jest.spyOn(axiosInstance, 'get');

    beforeEach(() => {
        axiosMock = new MockAdapter(axiosInstance);
    });
    afterEach(() => {
        axiosMock.reset();
    });
    it('should get movie successfully', async () => {
        // Given
        const movieId = '3d8f1342-15f1-44b1-a48f-4581d654b94a';
        axiosMock.onGet('/movies/' + movieId).reply(200, mockMovie);
        const args: any = {
            params: {
                id: movieId
            }
        };

        // When
        const response = await movieLoader(args);

        // Then
        expect(response).toEqual(mockMovie);
        expect(axiosGet).toHaveBeenCalledWith('/movies/' + movieId);
    });

    it('should throw error ', async () => {
        // Given
        const movieId = undefined;
        axiosMock.onGet('/movies/' + movieId).reply(200, mockMovie);
        const args: any = {
            params: {
                id: movieId
            }
        };

        // When
        try {
            await movieLoader(args);
        } catch (e: any) {
            // Then
            expect(e).toEqual(Error());
        }
        expect(axiosGet).not.toHaveBeenCalledWith('/movies/' + movieId);
    });
});

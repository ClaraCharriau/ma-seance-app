import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../../../client/axios.config';
import mockShowtime from '../../../mocks/showtimes/showtimes.json'
import { showtimeLoader } from './ShowtimeLoader';

describe('Showtime loader tests', () => {
    let axiosMock: MockAdapter;
    const axiosGet = jest.spyOn(axiosInstance, 'get');

    beforeEach(() => {
        axiosMock = new MockAdapter(axiosInstance);
    });
    afterEach(() => {
        axiosMock.reset();
    });
    it('should get showtime successfully', async () => {
        // Given
        const showtimeId = 'caadad78-7daf-4c49-abe8-2514b43884f6';
        axiosMock.onGet('/showtimes/' + showtimeId).reply(200, mockShowtime);
        const args: any = {
            params: {
                id: showtimeId
            }
        };

        // When
        const response = await showtimeLoader(args);

        // Then
        expect(response).toEqual(mockShowtime);
        expect(axiosGet).toHaveBeenCalledWith('/showtimes/' + showtimeId);
    });

    it('should throw error when failing to get showtime', async () => {
        // Given
        const showtimeId = undefined;
        axiosMock.onGet('/showtimes/' + showtimeId).reply(200, mockShowtime);
        const args: any = {
            params: {
                id: showtimeId
            }
        };

        // When
        try {
            await showtimeLoader(args);
        } catch (e: any) {
            // Then
            expect(e).toEqual(Error());
        }
        expect(axiosGet).not.toHaveBeenCalledWith('/showtimes/' + showtimeId);
    });
});

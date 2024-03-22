import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../axios.config';
import { getShowtimeById } from './showtimes.client';
import mockShowtimes from '../../mocks/showtimes/showtimes.json';

describe('showtimes client tests', () => {
    let axiosMock: MockAdapter;
    const axiosGet = jest.spyOn(axiosInstance, 'get');

    beforeEach(() => {
        axiosMock = new MockAdapter(axiosInstance);
    });
    afterEach(() => {
        axiosMock.reset();
    });

    it('should get showtime by id successfully', async () => {
        // Given
        axiosMock.onGet('/showtimes/1').reply(200, mockShowtimes);

        // When
        const response = await getShowtimeById('1');

        // Then
        expect(response).toEqual(mockShowtimes);
        expect(axiosGet).toHaveBeenCalledWith('/showtimes/1');
    });

    it('should fail to get showtime', async () => {
        // Given
        axiosMock.onGet('/showtimes/1').reply(500);

        // When
        try {
            await getShowtimeById('1');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
        }
        expect(axiosGet).toHaveBeenCalledWith('/showtimes/1');
    });
});

import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../axios.config';
import { getScreeningById } from './screenings.client';
import mockScreenings from '../../mock/screenings/screenings.json';

describe('screenings client tests', () => {
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
        axiosMock.onGet('http://localhost:7878/screenings/1').reply(200, mockScreenings);

        // When
        const response = await getScreeningById('1');

        // Then
        expect(response).toEqual(mockScreenings);
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/screenings/1');
    });

    it('should fail to get showtime', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/screenings/1').reply(500);

        // When
        try {
            await getScreeningById('1');
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
        }
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/screenings/1');
    });
});

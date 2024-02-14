import { theaterLoader } from './TheaterLoader';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import mockTheater from '../../mocks/theaters/theaters-1.json';

describe('Theater loader tests', () => {
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
    });
    afterEach(() => {
        axiosMock.reset();
    });
    it('should load theater successfully', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/theaters/1').reply(200, mockTheater);
        const args: any = {
            params: {
                id: '1'
            }
        };

        // When
        const response = await theaterLoader(args);

        // Then
        expect(response).toEqual(mockTheater);
    });

    it('should fail to load theater', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/theaters/1').reply(200, mockTheater);
        const args: any = {
            params: {
                id: '1'
            }
        };

        // When
        const response = await theaterLoader(args);

        // Then
        expect(response).toEqual(mockTheater);
    });
});

export {};

import { waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';
import { axiosInstance } from '../../client/axios.config';
import mockTheater from '../../mocks/theaters/theaters-1.json';
import { theaterLoader } from './TheaterLoader';

describe('Theater loader tests', () => {
    let axiosMock: MockAdapter;
    const mockResponse = {
        theater: mockTheater
    };

    beforeEach(() => {
        axiosMock = new MockAdapter(axiosInstance);
    });
    afterEach(() => {
        axiosMock.reset();
    });
    it('should load theater successfully', async () => {
        // Given
        axiosMock.onGet('/theaters/1').reply(200, mockTheater);
        const args: any = {
            params: {
                id: '1'
            }
        };
        let response: any;

        // When
        await act(async () => {
            response = await theaterLoader(args);
        });

        // Then
        waitFor(() => {
            expect(response.data).toEqual(mockResponse);
        });
    });

    it('should fail to load theater', async () => {
        // Given
        const id = undefined;
        const args: any = {
            params: {
                id
            }
        };

        // When
        try {
            await theaterLoader(args);
        } catch (error: any) {
            // Then
            expect(error).toEqual(Error());
        }
    });
});

export { };


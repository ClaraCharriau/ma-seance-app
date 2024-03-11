import { theaterLoader } from './TheaterLoader';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import mockTheater from '../../mocks/theaters/theaters-1.json';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';

describe('Theater loader tests', () => {
    let axiosMock: MockAdapter;
    const mockResponse = {
        theater: mockTheater
    };

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
        } catch (e: any) {
            // Then
            expect(e).toEqual(Error());
        }
    });
});

export {};

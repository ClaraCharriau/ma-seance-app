/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Theater } from '../../models/Theater';
import { getTheaterById } from './theaters.client';

describe('Theaters client tests', () => {
    let axiosMock: MockAdapter;
    const mockTheaters: Theater[] = [
        {
            id: '1',
            name: 'C2L Saint-Germain',
            address: '25-27-29, rue du Vieux-Marche 78100 Saint-Germain-en-Laye',
            imgPath: '/c2l-saint-germain'
        }
    ];

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
    });
    afterEach(() => {
        axiosMock.reset();
    });

    it('should get theater successfully', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/theaters/1').reply(200, mockTheaters);
        const axiosGet = jest.spyOn(require('axios'), 'get');

        // When
        const response = await getTheaterById(1);

        // Then
        expect(response).toEqual([
            {
                id: '1',
                name: 'C2L Saint-Germain',
                address: '25-27-29, rue du Vieux-Marche 78100 Saint-Germain-en-Laye',
                imgPath: '/c2l-saint-germain'
            }
        ]);
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/theaters/1');
    });

    it('should fail to get theater', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/theaters/1').reply(500, {});
        const axiosGet = jest.spyOn(require('axios'), 'get');
        let response = {};

        // When
        try {
            response = await getTheaterById(1);
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
            expect(response).toEqual({});
        }
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/theaters/1');
    });
});

export {};

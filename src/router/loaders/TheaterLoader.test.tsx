import { theaterLoader } from './TheaterLoader';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { Theater } from '../../models/Theater';

describe('Theater client tests', () => {
    let axiosMock: MockAdapter;
    const mockTheater: Theater[] = [
        {
            id: 1,
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
        axiosMock.onGet('http://localhost:7878/theaters/1').reply(200, mockTheater);
        const args: any = {
            params: {
                id: '1'
            }
        };

        // When
        const response = await theaterLoader(args);

        // Then
        expect(response).toEqual([
            {
                id: 1,
                name: 'C2L Saint-Germain',
                address: '25-27-29, rue du Vieux-Marche 78100 Saint-Germain-en-Laye',
                imgPath: '/c2l-saint-germain'
            }
        ]);
    });
});

export {};

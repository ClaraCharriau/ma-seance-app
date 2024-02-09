/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Theater } from '../models/Theater';
import { getUserFavTheaters } from './user.client';

describe('User client tests', () => {
    let axiosMock: MockAdapter;
    const mockTheaterList: Theater[] = [
        {
            id: 1,
            name: 'C2L Saint-Germain',
            address: '25-27-29, rue du Vieux-Marche 78100 Saint-Germain-en-Laye',
            imgPath: '/c2l-saint-germain'
        },
        {
            id: 2,
            name: 'C2L Poissy',
            address: '112 Rue du Général de Gaulle 78300 Poissy',
            imgPath: '/c2l-poissy'
        }
    ];

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
    });
    afterEach(() => {
        axiosMock.reset();
    });

    it('should get user fav theater successfully', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/users/1/fav-theaters').reply(200, mockTheaterList);

        // When
        const response = await getUserFavTheaters(1);

        // Then
        expect(response).toEqual([
            {
                id: 1,
                name: 'C2L Saint-Germain',
                address: '25-27-29, rue du Vieux-Marche 78100 Saint-Germain-en-Laye',
                imgPath: '/c2l-saint-germain'
            },
            {
                id: 2,
                name: 'C2L Poissy',
                address: '112 Rue du Général de Gaulle 78300 Poissy',
                imgPath: '/c2l-poissy'
            }
        ]);
    });

    it('should fail to get user fav theater', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/users/1/fav-theaters').reply(500, {});
        let response = {};

        // When
        try {
            response = await getUserFavTheaters(1);
        } catch (e: any) {
            // Then
            expect(e.message).toBe('Request failed with status code 500');
            expect(response).toEqual({});
        }
    });
});

export {};

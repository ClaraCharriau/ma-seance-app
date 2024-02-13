/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Movie } from '../../models/Movie';
import { getCurrentlyMovies } from './movies.client';

describe('Movies client tests', () => {
    let axiosMock: MockAdapter;
    const mockMovies: Movie[] = [
        {
            id: '3d8f1342-15f1-44b1-a48f-4581d654b94a',
            title: 'Pauvres créatures',
            releaseDate: '2024-01-17',
            duration: 90,
            resume: "Après s'être noyée pour échapper à son mari violent, le cerveau de Bella Baxter est remplacé par celui de son enfant à naître.",
            trailerLink: '',
            posterLink: '/5fT98da9ccWN2xr8VOJrSBp3Cdw.jpg',
            directorId: 'a72cde7f-3a10-4c59-8b76-6d3e08e7146d',
            castId: '84d13282-2bc5-40b0-9e16-2a5366fc2323'
        },
        {
            id: 'f7e41334-179d-451a-a1d4-e1b9a60ee785',
            title: 'Argylle',
            releaseDate: '2024-01-31',
            duration: 90,
            resume: "Elly Conway est une romancière spécialisée dans l'écriture de romans d'espionnage mettant en scène un agent secret fictif nommé Argylle. Cette femme très introvertie quitte rarement son domicile. Elle se retrouve liée aux activités d'un sinistre syndicat criminel clandestin et est secourue par un espion nommé Aiden. Elly et son chat bien-aimé Alfie sont alors plongés dans un monde secret où la fiction de ses romans rejoint la réalité y compris même qu'elle découvre que l'agent Argylle existe pour de vrai.",
            trailerLink: '',
            posterLink: '/uVAk2YliqInQfH4B4vzZ75rwcNB.jpg',
            directorId: 'fa321d12-7842-4d62-99dc-154759165c4c',
            castId: 'b01290c4-872b-492e-9859-49f4b70027cb'
        }
    ];

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
    });
    afterEach(() => {
        axiosMock.reset();
    });

    it('should get currently playing movies successfully', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/movies/currently').reply(200, mockMovies);
        const axiosGet = jest.spyOn(require('axios'), 'get');

        // When
        const response = await getCurrentlyMovies();

        // Then
        expect(response).toEqual([
            {
                id: '3d8f1342-15f1-44b1-a48f-4581d654b94a',
                title: 'Pauvres créatures',
                releaseDate: '2024-01-17',
                duration: 90,
                resume: "Après s'être noyée pour échapper à son mari violent, le cerveau de Bella Baxter est remplacé par celui de son enfant à naître.",
                trailerLink: '',
                posterLink: '/5fT98da9ccWN2xr8VOJrSBp3Cdw.jpg',
                directorId: 'a72cde7f-3a10-4c59-8b76-6d3e08e7146d',
                castId: '84d13282-2bc5-40b0-9e16-2a5366fc2323'
            },
            {
                id: 'f7e41334-179d-451a-a1d4-e1b9a60ee785',
                title: 'Argylle',
                releaseDate: '2024-01-31',
                duration: 90,
                resume: "Elly Conway est une romancière spécialisée dans l'écriture de romans d'espionnage mettant en scène un agent secret fictif nommé Argylle. Cette femme très introvertie quitte rarement son domicile. Elle se retrouve liée aux activités d'un sinistre syndicat criminel clandestin et est secourue par un espion nommé Aiden. Elly et son chat bien-aimé Alfie sont alors plongés dans un monde secret où la fiction de ses romans rejoint la réalité y compris même qu'elle découvre que l'agent Argylle existe pour de vrai.",
                trailerLink: '',
                posterLink: '/uVAk2YliqInQfH4B4vzZ75rwcNB.jpg',
                directorId: 'fa321d12-7842-4d62-99dc-154759165c4c',
                castId: 'b01290c4-872b-492e-9859-49f4b70027cb'
            }
        ]);
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/movies/currently');
    });

    it('should fail to get currently playing movies', async () => {
        // Given
        axiosMock.onGet('http://localhost:7878/movies/currently').reply(500, {});
        const axiosGet = jest.spyOn(require('axios'), 'get');
        let response = {};

        // When
        try {
            response = await getCurrentlyMovies();
        } catch (e: any) {
            // Then
            expect(e.status).toBe(500);
            expect(response).toEqual({});
        }
        expect(axiosGet).toHaveBeenCalledWith('http://localhost:7878/movies/currently');
    });
});

export {};

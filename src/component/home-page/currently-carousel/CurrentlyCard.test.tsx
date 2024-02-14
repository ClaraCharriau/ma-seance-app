/* eslint-disable  @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CurrentlyCard from './CurrentlyCard';

describe('Currently showing movie card component tests', () => {
    it('renders Movie Card component', () => {
        const mockMovie = {
            id: '3d8f1342-15f1-44b1-a48f-4581d654b94a',
            title: 'Pauvres créatures',
            releaseDate: '2024-01-17',
            duration: 90,
            resume: "Après s'être noyée pour échapper à son mari violent, le cerveau de Bella Baxter est remplacé par celui de son enfant à naître.",
            trailerLink: 'https://www.youtube.com/watch?v=ZGwOzkF6HjI&t=1s',
            posterLink: '/5fT98da9ccWN2xr8VOJrSBp3Cdw.jpg',
            photoLink: '/bQS43HSLZzMjZkcHJz4fGc7fNdz.jpg',
            directors: ['Yorgos Lanthimos'],
            cast: ['Emma Stone', 'Mark Ruffalo', 'Willem Dafoe'],
            genres: ['Science-Fiction', 'Romance', 'Comédie']
        };

        const component = render(
            <BrowserRouter>
                <CurrentlyCard movie={mockMovie} />
            </BrowserRouter>
        );

        expect(component.baseElement).toMatchSnapshot();
    });
});

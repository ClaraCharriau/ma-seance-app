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
            trailerLink: '',
            posterLink: '/5fT98da9ccWN2xr8VOJrSBp3Cdw.jpg',
            directorId: 'a72cde7f-3a10-4c59-8b76-6d3e08e7146d',
            castId: '84d13282-2bc5-40b0-9e16-2a5366fc2323'
        };

        const component = render(
            <BrowserRouter>
                <CurrentlyCard movie={mockMovie} />
            </BrowserRouter>
        );

        expect(component.baseElement).toMatchSnapshot();
    });
});

import { render, waitFor } from '@testing-library/react';
import { getCurrentlyMovies } from '../../../client/movies/movies.client';
import CurrentlyCarousel from './CurrentlyCarousel';
import { act } from 'react-dom/test-utils';

jest.mock('../../../client/movies/movies.client', () => ({
    getCurrentlyMovies: jest.fn()
}));
const mockGetCurrentlyMovies = getCurrentlyMovies as jest.MockedFunction<typeof getCurrentlyMovies>;

describe('Currently showing movie carousel component tests', () => {
    it('renders movie Carousel component', async () => {
        // Given
        const mockMovies = [
            {
                id: 'd171796e-93af-4d51-8b39-8d38b354d3c8',
                title: 'The Beekeeper',
                releaseDate: '2024-01-11',
                duration: 90,
                resume: 'La quête brutale de vengeance d’un homme prend des proportions démesurées alors que son passé d’agent secret d’une puissante organisation clandestine connue sous le nom des Apiculteurs est révélé.',
                trailerLink: '',
                posterLink: '/oJWHzabe1QxgomK4gaEDhITvxcM.jpg',
                directorId: '2d8f5fb2-1f79-47e5-ae19-043f8e19f101',
                castId: '4d927384-b7ff-4d9d-9c67-ec4e0a4d444f'
            },
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
            }
        ];
        mockGetCurrentlyMovies.mockResolvedValue(mockMovies);
        let component: any;

        // When
        act(() => {
            component = render(<CurrentlyCarousel />);
        });

        // Then
        await waitFor(() => {
            expect(component.container).toMatchSnapshot();
        });
    });
});

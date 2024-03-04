import { render, waitFor } from '@testing-library/react';
import { getCurrentlyMovies } from '../../../client/movies/movies.client';
import CurrentlyCarousel from './CurrentlyCarousel';
import { act } from 'react-dom/test-utils';
import mockMovies from '../../../mocks/movies/current-movies.json';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../../client/movies/movies.client', () => ({
    getCurrentlyMovies: jest.fn()
}));
const mockGetCurrentlyMovies = getCurrentlyMovies as jest.MockedFunction<typeof getCurrentlyMovies>;

describe('Currently showing movie carousel component tests', () => {
    it('renders movie Carousel component', async () => {
        // Given
        mockGetCurrentlyMovies.mockResolvedValue(mockMovies);
        let component: any;

        // When
        act(() => {
            component = render(
                <BrowserRouter>
                    <CurrentlyCarousel />
                </BrowserRouter>
            );
        });

        // Then
        await waitFor(() => {
            expect(component.getByAltText("Affiche du film The Beekeeper")).toBeInTheDocument();
        });
        expect(component.baseElement).toMatchSnapshot();
    });

    it('renders error when failing to get currently movies', async () => {
        // Given
        mockGetCurrentlyMovies.mockRejectedValue(new Error());
        let component: any;

        // When
        act(() => {
            component = render(<CurrentlyCarousel />);
        });

        // Then
        await waitFor(() => {
            expect(component.getByText("Une erreur s'est produite lors du chargement des films.")).toBeInTheDocument();
            expect(component.container).toMatchSnapshot();
        });
    });

    it('renders error when time out', async () => {
        // Given
        let component: any;

        // When
        act(() => {
            component = render(<CurrentlyCarousel />);
        });

        // Then
        await waitFor(() => {
            setTimeout(() => {
                console.log('time out');
            }, 5001);
            expect(component.getByText("Une erreur s'est produite lors du chargement des films.")).toBeInTheDocument();
            expect(component.container).toMatchSnapshot();
        });
    });
});

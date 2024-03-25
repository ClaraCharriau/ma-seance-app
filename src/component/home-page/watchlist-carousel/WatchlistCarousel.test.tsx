import { act, render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { getUserFavMovies } from '../../../client/users/user.client';
import mockMovies from '../../../mocks/users/fav-movies.json';
import WatchlistCarousel from './WatchlistCarousel';

jest.mock('../../../client/users/user.client', () => ({
    getUserFavMovies: jest.fn()
}));
const mockGetUserFavMovies = getUserFavMovies as jest.MockedFunction<typeof getUserFavMovies>;

describe('Watchlist movie carousel component tests', () => {
    it('renders movie Carousel component', async () => {
        // Given
        const mockUser = {
            id: "1",
            pseudo: 'Jane',
            email: 'test@mail.com'
        };
        mockGetUserFavMovies.mockResolvedValue(mockMovies);

        // When
        const component = render(
            <BrowserRouter>
                <WatchlistCarousel currentUser={mockUser} />
            </BrowserRouter>
        );

        // Then
        await waitFor(() => {
            expect(component.getByAltText("Affiche du film Pauvres créatures")).toBeInTheDocument();
        });
        expect(component.baseElement).toMatchSnapshot();
    });

    it('renders error when failing to get watchlist movies', async () => {
        // Given
        const mockUser = {
            id: "1",
            pseudo: 'Jane',
            email: 'test@mail.com'
        };
        mockGetUserFavMovies.mockRejectedValue(new Error());
        let component: any;

        // When
        act(() => {
            component = render(
                <BrowserRouter>
                    <WatchlistCarousel currentUser={mockUser} />
                </BrowserRouter>
            );
        });

        // Then
        await waitFor(() => {
            expect(component.getByText("Une erreur s'est produite lors du chargement des films.")).toBeInTheDocument();
            expect(component.container).toMatchSnapshot();
        });
    });

    it('renders error when time out', async () => {
        // Given
        const mockUser = {
            id: "1",
            pseudo: 'Jane',
            email: 'test@mail.com'
        };
        let component: any;

        // When
        act(() => {
            component = render(
                <BrowserRouter>
                    <WatchlistCarousel currentUser={mockUser} />
                </BrowserRouter>
            );
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

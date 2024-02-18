import { render, waitFor } from '@testing-library/react';
import mockMovies from '../../../mocks/movies/fav-movies.json';
import WatchlistCarousel from './WatchlistCarousel';
import { BrowserRouter } from 'react-router-dom';
import { getUserFavMovies } from '../../../client/users/user.client';
import { act } from 'react-dom/test-utils';

jest.mock('../../../client/users/user.client', () => ({
    getUserFavMovies: jest.fn()
}));
const mockGetUserFavMovies = getUserFavMovies as jest.MockedFunction<typeof getUserFavMovies>;

describe('Watchlist movie carousel component tests', () => {
    it('renders movie Carousel component', async () => {
        // Given
        const mockUser = {
            id: 1,
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
            expect(component.container).toMatchSnapshot();
        });
    });

    it('renders error when failing to get watchlist movies', async () => {
        // Given
        const mockUser = {
            id: 1,
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
            expect(component.container).toMatchSnapshot();
        });
    });

    it('renders error when time out', async () => {
        // Given
        const mockUser = {
            id: 1,
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
            expect(component.container).toMatchSnapshot();
        });
    });
});
import { render, waitFor } from '@testing-library/react';
import mockMovies from '../../../mocks/movies/fav-movies.json';
import WatchlistCarousel from './WatchlistCarousel';
import { BrowserRouter } from 'react-router-dom';
import { getUserFavMovies } from '../../../client/users/user.client';

jest.mock('../../../client/users/user.client', () => ({
    getUserFavMovies: jest.fn()
}));
const mockGetUserFavMovies = getUserFavMovies as jest.MockedFunction<typeof getUserFavMovies>;

describe('Currently showing movie carousel component tests', () => {
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
});

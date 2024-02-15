import { render, waitFor } from '@testing-library/react';
import { getCurrentlyMovies } from '../../../client/movies/movies.client';
import CurrentlyCarousel from './CurrentlyCarousel';
import { act } from 'react-dom/test-utils';
import mockMovies from '../../../mocks/movies/current-movies.json';

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
            component = render(<CurrentlyCarousel />);
        });

        // Then
        await waitFor(() => {
            expect(component.container).toMatchSnapshot();
        });
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
            expect(component.container).toMatchSnapshot();
        });
    });
});

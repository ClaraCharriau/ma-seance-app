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
});

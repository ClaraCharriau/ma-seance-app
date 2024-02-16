import { BrowserRouter } from 'react-router-dom';
import Currently from './Currently';
import { render } from '@testing-library/react';
import { getCurrentlyMovies } from '../../client/movies/movies.client';
import mockMovies from '../../mocks/movies/current-movies.json';

jest.mock('../../client/movies/movies.client', () => ({
    getCurrentlyMovies: jest.fn()
}));
const mockGetCurrentlyMovies = getCurrentlyMovies as jest.MockedFunction<typeof getCurrentlyMovies>;

describe('Currently component test', () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    it('should render component with a list of current movies', () => {
        // Given
        mockGetCurrentlyMovies.mockResolvedValue(mockMovies);

        // When
        const component = render(
            <BrowserRouter>
                <Currently />
            </BrowserRouter>
        );

        // Then
        expect(component.baseElement).toMatchSnapshot();
    });

    it('should fail to render a list of current movies', () => {
        // Given
        mockGetCurrentlyMovies.mockRejectedValue(new Error());

        // When
        const component = render(
            <BrowserRouter>
                <Currently />
            </BrowserRouter>
        );

        // Then
        expect(component.baseElement).toMatchSnapshot();
    });
});

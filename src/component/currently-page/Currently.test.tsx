import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { getCurrentlyMoviesWithDetails } from '../../client/movies/movies.client';
import mockMovies from '../../mock/movies/current-movies.json';
import Currently from './Currently';

jest.mock('../../client/movies/movies.client', () => ({
    getCurrentlyMoviesWithDetails: jest.fn()
}));
const mockGetCurrentlyMoviesWithDetails = getCurrentlyMoviesWithDetails as jest.MockedFunction<
    typeof getCurrentlyMoviesWithDetails
>;

describe('Currently component test', () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    it('should render component with a list of current movies', async () => {
        // Given
        mockGetCurrentlyMoviesWithDetails.mockResolvedValue(mockMovies);

        // When
        const component = render(
            <BrowserRouter>
                <Currently />
            </BrowserRouter>
        );

        // Then
        await waitFor(() => {
            expect(component.getByText('Madame Web')).toBeInTheDocument();
        });
        expect(component.baseElement).toMatchSnapshot();
    });

    it('should fail to render a list of current movies', async () => {
        // Given
        mockGetCurrentlyMoviesWithDetails.mockRejectedValue(new Error());

        // When
        const component = render(
            <BrowserRouter>
                <Currently />
            </BrowserRouter>
        );

        // Then
        await waitFor(() => {
            expect(component.getByText("Une erreur s'est produite lors du chargement des films.")).toBeInTheDocument();
            expect(component.container).toMatchSnapshot();
        });
    });
});

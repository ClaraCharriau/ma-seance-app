import { BrowserRouter } from 'react-router-dom';
import Currently from './Currently';
import { render, waitFor } from '@testing-library/react';
import { getCurrentlyMovies } from '../../client/movies/movies.client';
import mockMovies from '../../mocks/movies/current-movies.json';

jest.mock('../../client/movies/movies.client', () => ({
    getCurrentlyMovies: jest.fn()
}));
const mockGetCurrentlyMovies = getCurrentlyMovies as jest.MockedFunction<typeof getCurrentlyMovies>;

describe('Currently component test', () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    it('should render component with a list of current movies', async () => {
        // Given
        mockGetCurrentlyMovies.mockResolvedValue(mockMovies);

        // When
        const component = render(
            <BrowserRouter>
                <Currently />
            </BrowserRouter>
        );

        // Then
        await waitFor(() => {
            expect(component.getByText("Madame Web")).toBeInTheDocument();
        });
        expect(component.baseElement).toMatchSnapshot();
    });

    it('should fail to render a list of current movies', async () => {
        // Given
        mockGetCurrentlyMovies.mockRejectedValue(new Error());

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

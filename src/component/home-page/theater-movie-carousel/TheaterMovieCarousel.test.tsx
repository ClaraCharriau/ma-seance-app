import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TheaterMovieCarousel from './TheaterMovieCarousel';
import mockMovies from '../../../mocks/theaters/theater-movies.json';
import { getTheaterMoviesByTheaterId } from '../../../client/theaters/theaters.client';

jest.mock('../../../client/theaters/theaters.client', () => ({
    getTheaterMoviesByTheaterId: jest.fn()
}));
const mockGetTheaterMovies = getTheaterMoviesByTheaterId as jest.MockedFunction<typeof getTheaterMoviesByTheaterId>;
describe('Theater movie carousel component tests', () => {
    test('should render component', () => {
        // Given
        mockGetTheaterMovies.mockResolvedValue(mockMovies);
        // When
        const component = render(
            <BrowserRouter>
                <TheaterMovieCarousel theaterId={'1'} />
            </BrowserRouter>
        );
        // then
        expect(component.baseElement).toMatchSnapshot();
    });

    test('should fail to render component', () => {
        // Given
        mockGetTheaterMovies.mockRejectedValue(new Error());
        // When
        const component = render(
            <BrowserRouter>
                <TheaterMovieCarousel theaterId={'1'} />
            </BrowserRouter>
        );
        // then
        expect(component.baseElement).toMatchSnapshot();
    });
});

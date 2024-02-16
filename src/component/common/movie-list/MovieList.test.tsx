import { render } from '@testing-library/react';
import MovieList from './MovieList';
import mockMovieList from '../../../mocks/movies/current-movies.json';
import { BrowserRouter } from 'react-router-dom';

describe('Movie list component test', () => {
    it('should render component with a list of movies', () => {
        // Given
        // When
        const component = render(
            <BrowserRouter>
                <MovieList movieList={mockMovieList} />
            </BrowserRouter>
        );

        // Then
        expect(component.baseElement).toMatchSnapshot();
    });
});

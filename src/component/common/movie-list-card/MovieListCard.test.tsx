import mockMovie from '../../../mocks/movies/movie-1.json';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import MovieListCard from './MovieListCard';

describe('Movie list card component test', () => {
    it('should render component a card', () => {
        // Given
        // When
        const component = render(
            <BrowserRouter>
                <MovieListCard movie={mockMovie} />
            </BrowserRouter>
        );

        // Then
        expect(component.baseElement).toMatchSnapshot();
    });
});

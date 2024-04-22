import { render } from '@testing-library/react';
import mockMovie from '../../mock/movies/movie-1.json';
import MovieDetailsLayout from './MovieDetailsLayout';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLoaderData: () => {
        return mockMovie;
    }
}));

describe('Movie Details Component', () => {
    it('renders movie details component', () => {
        jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
        
        const component = render(
            <BrowserRouter>
                <MovieDetailsLayout />
            </BrowserRouter>
        );

        expect(component.container).toMatchSnapshot();
    });
});

import { render } from '@testing-library/react';
import mockMovie from '../../mocks/movies/movie-1.json';
import MovieDetails from './MovieDetails';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLoaderData: () => {
        return mockMovie;
    }
}));

describe('Movie Details Component', () => {
    it('renders movie details component', () => {
        const component = render(<MovieDetails />);

        expect(component.container).toMatchSnapshot();
    });
});

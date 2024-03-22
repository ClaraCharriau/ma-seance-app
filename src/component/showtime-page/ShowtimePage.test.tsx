import { render } from '@testing-library/react';
import ShowtimePage from './ShowtimePage';
import { BrowserRouter } from 'react-router-dom';
import mockShowtime from '../../mocks/showtimes/showtimes.json';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLoaderData: () => {
        return mockShowtime;
    }
}));

describe('showtime page component tests', () => {
    it('should render page', () => {
        // When
        const component = render(
            <BrowserRouter>
                <ShowtimePage />
            </BrowserRouter>
        );

        // Then
        expect(component.baseElement).toMatchSnapshot();
    });
});

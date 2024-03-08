import { render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import mockScreeningsData from '../../../mocks/movies/theaters-screenings-by-movie-id-and-day-1.json';
import TheaterScreeningsList from './TheaterScreeningsList';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLoaderData: () => {
        return mockScreeningsData;
    }
}));

describe('Movie Details Component', () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    it('renders movie details component', () => {
        // Given
        let component: any;

        // When
        act(() => {
            component = render(
                <BrowserRouter>
                    <TheaterScreeningsList />
                </BrowserRouter>
            );
        });

        // Then
        waitFor(() => {
            expect(component.container).toMatchSnapshot();
        });
    });
});

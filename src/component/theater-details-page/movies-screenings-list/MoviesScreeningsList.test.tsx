import { render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import mockScreeningsData from '../../../mocks/theaters/movies-screenings-by-theater-id-and-day-1.json';
import MoviesScreeningsList from './MoviesScreeningsList';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLoaderData: () => {
        return mockScreeningsData;
    }
}));

describe('Theater Details Component', () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    it('renders theater details component', () => {
        // Given
        let component: any;

        // When
        act(() => {
            component = render(
                <BrowserRouter>
                    <MoviesScreeningsList />
                </BrowserRouter>
            );
        });

        // Then
        waitFor(() => {
            expect(component.container).toMatchSnapshot();
        });
    });
});

import { act, render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import mockScreeningsData from '../../../mock/theaters/movies-screenings-by-theater-id-and-day-1.json';
import mockTheater from '../../../mock/theaters/theaters-1.json';
import MoviesScreeningsList from './MoviesScreeningsList';

let mockData = mockScreeningsData;

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLoaderData: () => {
        return { movieScreenings: mockData };
    },
    useLocation: () => ({
        state: {
            theater: mockTheater
        }
    })
}));

describe('Movie Screenings Component', () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    it('should renders movie screenings list component', () => {
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

    it('should display empty screening list message', () => {
        // Given
        let component: any;
        mockData = [];

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

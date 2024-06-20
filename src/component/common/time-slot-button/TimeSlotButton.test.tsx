import { fireEvent, render } from '@testing-library/react';
import TimeSlotButton from './TimeSlotButton';
import mockMovie from '../../../mock/movies/movie-1.json';
import mockTheater from '../../../mock/theaters/theaters-1.json';
import { BrowserRouter } from 'react-router-dom';

describe('time slot button component tests', () => {
    jest.useFakeTimers().setSystemTime(new Date('2024-01-20'));

    const mockScreeningDate = {
        date: '2024-02-17T21:45:00',
        dayName: 'mercredi',
        dayNumber: '17',
        month: 'février',
        year: '2024',
        hourly: '21:45'
    };

    it('should render time slot button', () => {
        const component = render(
            <BrowserRouter>
                <TimeSlotButton
                    screeningId={'1'}
                    screeningDate={mockScreeningDate}
                    theater={mockTheater}
                    movie={mockMovie}
                />
            </BrowserRouter>
        );

        expect(component.getByText('21:45')).toBeInTheDocument();
    });

    it('should open showtime modale confirmation on click', () => {
        // Given
        const component = render(
            <BrowserRouter>
                <TimeSlotButton
                    screeningId={'1'}
                    screeningDate={mockScreeningDate}
                    theater={mockTheater}
                    movie={mockMovie}
                />
            </BrowserRouter>
        );
        const button = component.getByText('21:45');

        // When
        fireEvent.click(button);

        // Then
        expect(component.getByText('Pauvres créatures')).toBeInTheDocument();
        expect(component.baseElement).toMatchSnapshot();
    });

    it('should close showtime modale confirmation on click', () => {
        // Given
        const component = render(
            <BrowserRouter>
                <TimeSlotButton
                    screeningId={'1'}
                    screeningDate={mockScreeningDate}
                    theater={mockTheater}
                    movie={mockMovie}
                />
            </BrowserRouter>
        );
        const openButton = component.getByText('21:45');
        fireEvent.click(openButton);
        const closeButton = component.getByText('Annuler');

        // When
        fireEvent.click(closeButton);

        // Then
        expect(component.baseElement).toMatchSnapshot();
    });
});

import { fireEvent, render } from '@testing-library/react';
import TimeSlotButton from './TimeSlotButton';
import mockMovie from '../../../mocks/movies/movie-1.json';
import mockTheater from '../../../mocks/theaters/theaters-1.json';
import { BrowserRouter } from 'react-router-dom';

describe('time slot button component tests', () => {
    const mockScreeningDate = {
        date: '2024-02-17T11:45:00',
        dayName: 'mercredi',
        dayNumber: '17',
        month: 'février',
        year: '2024',
        hourly: '11:45'
    };

    it('should render time slot button', () => {
        const component = render(
            <BrowserRouter>
                <TimeSlotButton screeningDate={mockScreeningDate} theater={mockTheater} movie={mockMovie} />
            </BrowserRouter>
        );

        expect(component.getByText('11:45')).toBeInTheDocument();
    });

    it('should open showtime modale confirmation on click', () => {
        // Given
        const component = render(
            <BrowserRouter>
                <TimeSlotButton screeningDate={mockScreeningDate} theater={mockTheater} movie={mockMovie} />
            </BrowserRouter>
        );
        const button = component.getByText('11:45');

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
                <TimeSlotButton screeningDate={mockScreeningDate} theater={mockTheater} movie={mockMovie} />
            </BrowserRouter>
        );
        const openButton = component.getByText('11:45');
        fireEvent.click(openButton);
        const closeButton = component.getByText('Annuler');

        // When
        fireEvent.click(closeButton);

        // Then
        expect(component.baseElement).toMatchSnapshot();
    });
});

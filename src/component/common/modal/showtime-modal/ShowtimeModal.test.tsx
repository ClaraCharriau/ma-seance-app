import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import mockMovie from '../../../../mock/movies/movie-1.json';
import mockTheater from '../../../../mock/theaters/theaters-1.json';
import ShowtimeModal from './ShowtimeModal';

describe('showtime modal component test', () => {
    const mockScreeningDate = {
        date: '2024-02-17T11:45:00',
        dayName: 'mercredi',
        dayNumber: '17',
        month: 'février',
        year: '2024',
        hourly: '11:45'
    };
    const mockCloseBtnCallback = () => {
        return;
    };
    const agendaContext = require('../../../../context/agenda.context');
    jest.spyOn(agendaContext, 'useAgendaContext').mockReturnValue({
        updateAgenda: async () => {}
    });

    it('should render showtime modal', () => {
        // Given
        const component = render(
            <BrowserRouter>
                <ShowtimeModal
                    screeningId={'1'}
                    theater={mockTheater}
                    movie={mockMovie}
                    screeningDate={mockScreeningDate}
                    openModal={true}
                    closeModal={mockCloseBtnCallback}
                />
            </BrowserRouter>
        );
        const addToAgendaButton = component.getByText("Ajouter à l'agenda");

        // When
        fireEvent.click(addToAgendaButton);

        // Then
        expect(component).toMatchSnapshot();
    });
});

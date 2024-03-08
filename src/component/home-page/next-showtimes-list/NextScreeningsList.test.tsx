import { render } from '@testing-library/react';
import NextShowtimesList from './NextScreeningsList';
import mockShowtimes from '../../../mocks/showtimes/user-showtimes.json';
import { BrowserRouter } from 'react-router-dom';

describe('Next screenings list component test', () => {
    const agendaContext = require('../../../context/agenda.context');
    it('should render screenings list component', () => {
        // Given
        jest.spyOn(agendaContext, 'useAgendaContext').mockReturnValue({
            showtimes: mockShowtimes
        });

        // When
        const component = render(
            <BrowserRouter>
                <NextShowtimesList />
            </BrowserRouter>
        );

        // Then
        expect(component.baseElement).toMatchSnapshot();
    });
});

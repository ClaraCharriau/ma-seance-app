import { render } from '@testing-library/react';
import NextScreeningsList from './NextScreeningsList';
import mockScreenings from '../../../mock/users/user-showtimes.json';
import { BrowserRouter } from 'react-router-dom';

describe('Next screenings list component test', () => {
    const agendaContext = require('../../../context/agenda.context');
    it('should render screenings list component', () => {
        // Given
        jest.spyOn(agendaContext, 'useAgendaContext').mockReturnValue({
            screenings: mockScreenings
        });

        // When
        const component = render(
            <BrowserRouter>
                <NextScreeningsList />
            </BrowserRouter>
        );

        // Then
        expect(component.baseElement).toMatchSnapshot();
    });
});

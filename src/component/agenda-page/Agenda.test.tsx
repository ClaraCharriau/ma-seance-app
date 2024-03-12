import { render } from '@testing-library/react';
import Agenda from './Agenda';
import mockNextWeekNextMonthScreenings from '../../mocks/users/user-showtimes-next-week-next-month-screenings.json';
import mockPassedAndNextYearScreenings from '../../mocks/users/user-showtimes-passed-screening-next-year-screening.json';
import { BrowserRouter } from 'react-router-dom';

describe('Agenda page tests', () => {
    const agendaContext = require('../../context/agenda.context');
    jest.useFakeTimers().setSystemTime(new Date('2024-03-11'));

    it('should render agenda page with next week and next month screenings', () => {
        jest.spyOn(agendaContext, 'useAgendaContext').mockReturnValue({
            showtimes: mockNextWeekNextMonthScreenings
        });
        const component = render(
            <BrowserRouter>
                <Agenda />
            </BrowserRouter>
        );

        expect(component.container).toMatchSnapshot();
    });

    it('should render agenda page with passed screenings and next year screenings', () => {
        jest.spyOn(agendaContext, 'useAgendaContext').mockReturnValue({
            showtimes: mockPassedAndNextYearScreenings
        });
        const component = render(
            <BrowserRouter>
                <Agenda />
            </BrowserRouter>
        );

        expect(component.container).toMatchSnapshot();
    });

    it('should render agenda page without any screenings', () => {
        jest.spyOn(agendaContext, 'useAgendaContext').mockReturnValue({
            showtimes: []
        });
        const component = render(
            <BrowserRouter>
                <Agenda />
            </BrowserRouter>
        );

        expect(component.container).toMatchSnapshot();
    });
});

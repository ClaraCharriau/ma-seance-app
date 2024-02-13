import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppLayout from './AppLayout';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigation: () => {
        return { state: 'loading' };
    },
    ScrollRestoration: jest.fn()
}));

describe('App layout component tests', () => {
    it('should render spinner', () => {
        jest.spyOn(require('react-router-dom'), 'useNavigation').mockImplementation(() => {
            return { state: 'loading' };
        });

        const component = render(
            <BrowserRouter>
                <AppLayout />
            </BrowserRouter>
        );

        expect(component.container).toMatchSnapshot();
    });

    it('should render app layout component', () => {
        jest.spyOn(require('react-router-dom'), 'useNavigation').mockImplementation(() => {
            return { state: '' };
        });

        const component = render(
            <BrowserRouter>
                <AppLayout />
            </BrowserRouter>
        );

        expect(component.container).toMatchSnapshot();
    });
});

export {};

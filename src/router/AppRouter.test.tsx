import { render } from '@testing-library/react';
import { AppLayout } from './AppRouter';
import { BrowserRouter } from 'react-router-dom';

describe('App router component tests', () => {
    it('should render app layout component', () => {
        const component = render(
            <BrowserRouter>
                <AppLayout />
            </BrowserRouter>
        );

        expect(component.container).toMatchSnapshot();
    });
});

export {};

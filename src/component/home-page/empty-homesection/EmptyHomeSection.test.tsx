import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EmptyHomeSection from './EmptyHomeSection';

describe('Empty home section component', () => {
    it('renders Empty home section component for theater', () => {
        const component = render(
            <BrowserRouter>
                <EmptyHomeSection itemType={'theater'} />
            </BrowserRouter>
        );

        expect(component.container).toMatchSnapshot();
    });

    it('renders Empty home section component for movie', () => {
        const component = render(
            <BrowserRouter>
                <EmptyHomeSection itemType={'movie'} />
            </BrowserRouter>
        );

        expect(component.container).toMatchSnapshot();
    });

    it('should redirect on click', async () => {
        const component = render(
            <BrowserRouter>
                <EmptyHomeSection itemType={'movie'} />
            </BrowserRouter>
        );
        const button = await component.findByText('Rechercher un film');

        fireEvent.click(button);

        expect(component.container).toMatchSnapshot();
    });
});

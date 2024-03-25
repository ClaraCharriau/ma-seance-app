import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SearchPage } from './SearchPage';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        state: {
            query: 'test'
        }
    })
}));

describe('Search page tests', () => {
    it('should render search page', () => {
        // Given
        const component = render(
            <BrowserRouter>
                <SearchPage />
            </BrowserRouter>
        );

        // Then
        expect(component.baseElement).toMatchSnapshot();
    });
});

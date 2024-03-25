import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Searchbar from './Searchbar';

describe('Search bar component tests', () => {
    it('should render search bar', () => {
        // Given
        const { getByPlaceholderText } = render(
            <BrowserRouter>
                <Searchbar />
            </BrowserRouter>
        );

        // Then
        expect(getByPlaceholderText('Rechercher un cinéma, un film...')).toBeInTheDocument();
    });

    it('should render search field with input', () => {
        // Given
        const component = render(
            <BrowserRouter>
                <Searchbar />
            </BrowserRouter>
        );
        const searchInput = component.getByPlaceholderText('Rechercher un cinéma, un film...');

        // When
        fireEvent.change(searchInput, { target: { value: 'test' } });
        fireEvent.keyDown(searchInput, { key: 'enter', keyCode: 13 });

        // Then
        expect(component.baseElement).toMatchSnapshot();
    });
});

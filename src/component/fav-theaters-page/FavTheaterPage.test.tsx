import { render } from '@testing-library/react';
import FavTheaters from './FavTheaterPage';
import { BrowserRouter } from 'react-router-dom';
import mockFavoriteTheaters from '../../mocks/users/fav-theaters.json';

describe('Favorite theaters Component', () => {
    const favoriteContext = require('../../context/favorite.context');
    it('renders favorite theaters component', () => {
        // Given
        jest.spyOn(favoriteContext, 'useFavoriteContext').mockReturnValue({
            favoriteTheaters: mockFavoriteTheaters
        });

        // When
        const component = render(
            <BrowserRouter>
                <FavTheaters />
            </BrowserRouter>
        );

        // Then
        expect(component.container).toMatchSnapshot();
        
    });

    it('renders favorite theaters component when there are no favorite theaters', () => {
        // Given
        jest.spyOn(favoriteContext, 'useFavoriteContext').mockReturnValue({
            favoriteTheaters: []
        });

        // When
        const component = render(
            <BrowserRouter>
                <FavTheaters />
            </BrowserRouter>
        );

        // Then
        expect(component.container).toMatchSnapshot();
    });
});

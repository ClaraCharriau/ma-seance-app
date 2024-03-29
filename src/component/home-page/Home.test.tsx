/* eslint-disable  @typescript-eslint/no-explicit-any */
import { act, render, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../context/auth.context';
import mockTheaters from '../../mocks/users/fav-theaters.json';
import Home from './Home';

describe('Home Component', () => {
    const favoriteContext = require('../../context/favorite.context');

    beforeEach(() => {
        const mockUser = {
            id: 1,
            pseudo: 'Jane',
            email: 'test@gmail.com'
        };
        localStorage.setItem('user', JSON.stringify(mockUser));
    });

    it('should render home page', async () => {
        // Given
        let component: any;
        jest.spyOn(favoriteContext, 'useFavoriteContext').mockReturnValue({
            favoriteTheaters: mockTheaters
        });

        // When
        act(() => {
            component = render(
                <AuthProvider>
                    <Router>
                        <Home />
                    </Router>
                </AuthProvider>
            );
        });

        // Then
        await waitFor(() => {
            expect(component.getByText('C2L Saint-Germain')).toBeInTheDocument();
            expect(component.container).toMatchSnapshot();
        });
    });
});

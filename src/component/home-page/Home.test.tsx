/* eslint-disable  @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { AuthProvider } from '../../context/auth.context';

describe('Home Component', () => {
    beforeEach(() => {
        const mockUser = {
            id: 1,
            pseudo: 'Jane',
            email: 'test@gmail.com'
        };
        localStorage.setItem('user', JSON.stringify(mockUser));
    });

    it('should render home page', () => {
        // Given
        let component: any;

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
        expect(component.baseElement).toMatchSnapshot();
        expect(component.getByText('Cinémas favoris')).toBeInTheDocument();
    });
});

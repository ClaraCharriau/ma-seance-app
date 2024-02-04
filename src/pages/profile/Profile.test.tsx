import { render } from '@testing-library/react';
import Profile from './Profile';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../context/auth.context';

describe('Profile page component tests', () => {
    it('should render profile page', () => {
        // Given
        const { getByText } = render(
            <Router>
                <AuthProvider>
                    <Profile />
                </AuthProvider>
            </Router>
        );

        // Then
    });
});

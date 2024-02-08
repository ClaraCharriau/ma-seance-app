import { render } from '@testing-library/react';
import LoginForm from './LoginForm';
import { BrowserRouter as Router } from 'react-router-dom';

describe('LoginForm component tests', () => {
    it('should render login form component', () => {
        // Given
        // When
        const { getByText, getByLabelText } = render(
            <Router>
                <LoginForm />
            </Router>
        );

        // Then
        expect(getByLabelText('Adresse e-mail')).toBeInTheDocument();
        expect(getByLabelText('Mot de passe')).toBeInTheDocument();
        expect(getByText('Connexion')).toBeInTheDocument();
    });

    it('should login existing user', async () => {});

    it('should set non existing user error', async () => {});

    it('should not log user if form is invalid', async () => {});

    it('should return false and set missing email error', async () => {});

    it('should return false and set invalid email error', async () => {});

    it('should return false and set missing password error', async () => {});

    it('should return true with valid form', async () => {});
});
export {};

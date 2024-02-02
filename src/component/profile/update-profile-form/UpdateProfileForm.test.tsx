import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UpdateProfileForm from '../update-profile-form/UpdateProfileForm';

describe('UpdateProfileForm component tests', () => {
    it('should render profile update form', () => {
        // Given
        const mockUser = {
            id: 1,
            pseudo: 'Jane',
            email: 'test@gmail.com'
        };

        // When
        const { getByText, getByLabelText } = render(
            <Router>
                <UpdateProfileForm user={mockUser} />
            </Router>
        );

        // Then
        expect(getByText('Modifier vos informations de profil')).toBeInTheDocument();
        expect(getByLabelText('Pseudo *')).toBeInTheDocument();
        expect(getByLabelText('Adresse e-mail *')).toBeInTheDocument();
        expect(getByLabelText('Votre mot de passe *')).toBeInTheDocument();
        expect(getByText('Sauver les changements')).toBeInTheDocument();
    });
});
export {};

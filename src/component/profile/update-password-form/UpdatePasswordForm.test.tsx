import { render } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import UpdatePasswordForm from "./UpdatePasswordForm";

describe('UpdateProfileForm component tests', () => {
    it('should render profile update form', () => {
        // Given
        const mockUser = {
            id: 1,
            pseudo: 'Jane',
            email: 'test@mail.com'
        }

        // When
        const { getByText, getByLabelText } = render(
            <Router>
                <UpdatePasswordForm user={mockUser} />
            </Router>
        );
    
        // Then
        expect(getByText('Modifier votre mot de passe')).toBeInTheDocument();
        expect(getByLabelText('Ancien mot de passe *')).toBeInTheDocument();
        expect(getByLabelText('Nouveau mot de passe *')).toBeInTheDocument();
        expect(getByLabelText('Confirmez le mot de passe *')).toBeInTheDocument();
        expect(getByText('Changer de mot de passe')).toBeInTheDocument();
    });
});
export {};

import { render } from "@testing-library/react";
import AccountCreation from "./AccountCreation";

describe('AccountCreation component tests', () => {

    it('should render account creation component', () => {
        // Given
        const mockSignUpClickCallback = () => {
            console.log('click');
        };

        // When
        const { getByText, getByLabelText } = render(
            <AccountCreation onSignUpClick={mockSignUpClickCallback} />
        );
    
        // Then
        expect(getByText('Créer un compte')).toBeInTheDocument();
        expect(getByLabelText('Pseudo *')).toBeInTheDocument();
        expect(getByLabelText('Adresse e-mail *')).toBeInTheDocument();
        expect(getByLabelText('Mot de passe *')).toBeInTheDocument();
        expect(getByLabelText('Confirmez le mot de passe *')).toBeInTheDocument();
        expect(getByText("S'inscrire")).toBeInTheDocument();
    });
    
    it('should create account', async () => {});

    it('should set error when account creation did not work', async () => {});

    it('should set already existing account error', async () => {});

    it('should return false and set missing pseudo error', async () => {});

    it('should return false and set missing email error', async () => {});

    it('should return false and set invalid email error', async () => {});

    it('should return false and set missing password error', async () => {});

    it('should return false and set unmaching password error', async () => {});

    it('should return false and set longer password error', async () => {});

    it('should return true with valid form', async () => {});
});
export {};

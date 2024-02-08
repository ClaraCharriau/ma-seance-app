import { fireEvent, render, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UpdateProfileForm from './UpdateProfileForm';
import { act } from 'react-dom/test-utils';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('UpdateProfileForm component tests', () => {
    let axiosMock: MockAdapter;
    const mockUser = {
        id: 1,
        pseudo: 'Jane',
        email: 'test@mail.com'
    };

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
    });

    afterEach(() => {
        axiosMock.reset();
    });

    it('should render profile update form', () => {
        // Given
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

    it('should set pseudo error if field is empty', () => {
        // Given
        const { getByLabelText, getByText, getByRole } = render(
            <Router>
                <UpdateProfileForm user={mockUser} />
            </Router>
        );
        const pseudoInput = getByLabelText('Pseudo *');

        // When
        act(() => {
            fireEvent.change(pseudoInput, { target: { value: '' } });
        });
        act(() => {
            fireEvent.submit(getByRole('button', { name: 'Sauver les changements' }));
        });

        // Then
        waitFor(() => {
            expect(getByText('Choisissez un pseudo.')).toBeInTheDocument();
        });
    });

    it('should set pseudo error if new pseudo is under 4 characters', () => {
        // Given
        const { getByLabelText, getByText, getByRole } = render(
            <Router>
                <UpdateProfileForm user={mockUser} />
            </Router>
        );
        const pseudoInput = getByLabelText('Pseudo *');

        // When
        act(() => {
            fireEvent.change(pseudoInput, { target: { value: 'joe' } });
        });
        act(() => {
            fireEvent.submit(getByRole('button', { name: 'Sauver les changements' }));
        });

        // Then
        waitFor(() => {
            expect(getByText('Votre pseudo doit contenir plus de 4 caractères.')).toBeInTheDocument();
        });
    });

    it('should set email error if field is empty', () => {
        // Given
        const { getByLabelText, getByText, getByRole } = render(
            <Router>
                <UpdateProfileForm user={mockUser} />
            </Router>
        );
        const pseudoInput = getByLabelText('Pseudo *');
        const emailInput = getByLabelText('Adresse e-mail *');

        // When
        act(() => {
            fireEvent.change(pseudoInput, { target: { value: 'Barbie' } });
            fireEvent.change(emailInput, { target: { value: '' } });
        });
        act(() => {
            fireEvent.submit(getByRole('button', { name: 'Sauver les changements' }));
        });

        // Then
        waitFor(() => {
            expect(getByText('Entrez votre adresse email.')).toBeInTheDocument();
        });
    });

    it('should set email error if email is invalid', () => {
        // Given
        const { getByLabelText, getByText, getByRole } = render(
            <Router>
                <UpdateProfileForm user={mockUser} />
            </Router>
        );
        const pseudoInput = getByLabelText('Pseudo *');
        const emailInput = getByLabelText('Adresse e-mail *');

        // When
        act(() => {
            fireEvent.change(pseudoInput, { target: { value: 'Barbie' } });
            fireEvent.change(emailInput, { target: { value: 'barbie' } });
        });
        act(() => {
            fireEvent.submit(getByRole('button', { name: 'Sauver les changements' }));
        });

        // Then
        waitFor(() => {
            expect(getByText("Merci d'entrer une adresse email valide.")).toBeInTheDocument();
        });
    });

    it('should set password error if field is empty', () => {
        // Given
        const { getByLabelText, getByText, getByRole } = render(
            <Router>
                <UpdateProfileForm user={mockUser} />
            </Router>
        );
        const pseudoInput = getByLabelText('Pseudo *');
        const emailInput = getByLabelText('Adresse e-mail *');
        const passwordInput = getByLabelText('Votre mot de passe *');

        // When
        act(() => {
            fireEvent.change(pseudoInput, { target: { value: 'Barbie' } });
            fireEvent.change(emailInput, { target: { value: 'barbie@test.fr' } });
            fireEvent.change(passwordInput, { target: { value: '' } });
        });
        act(() => {
            fireEvent.click(getByRole('button', { name: 'Sauver les changements' }));
        });

        // Then
        waitFor(() => {
            expect(getByText('Entrez votre mot de passe actuel')).toBeInTheDocument();
        });
    });

    it('should set password error if password is incorrect', () => {
        // Given
        axiosMock.onPost('http://localhost:7878/auth').reply(200, null);
        const component = render(
            <Router>
                <UpdateProfileForm user={mockUser} />
            </Router>
        );
        const pseudoInput = component.getByLabelText('Pseudo *');
        const emailInput = component.getByLabelText('Adresse e-mail *');
        const passwordInput = component.getByLabelText('Votre mot de passe *');

        // When
        act(() => {
            fireEvent.change(pseudoInput, { target: { value: 'Barbie' } });
            fireEvent.change(emailInput, { target: { value: 'barbie@test.fr' } });
            fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
        });
        act(() => {
            fireEvent.click(component.getByRole('button', { name: 'Sauver les changements' }));
        });

        // Then
        waitFor(() => {
            expect(component.getByText('Votre mot de passe actuel est erroné')).toBeInTheDocument();
        });
    });

    it('should set verify error if email already exist', () => {
        // Given
        axiosMock.onPost('http://localhost:7878/auth').reply(200);
        axiosMock.onPost('http://localhost:7878/verify').reply(200, {
            exists: true
        });
        const component = render(
            <Router>
                <UpdateProfileForm user={mockUser} />
            </Router>
        );
        const pseudoInput = component.getByLabelText('Pseudo *');
        const emailInput = component.getByLabelText('Adresse e-mail *');
        const passwordInput = component.getByLabelText('Votre mot de passe *');

        // When
        act(() => {
            fireEvent.change(pseudoInput, { target: { value: 'Barbie' } });
            fireEvent.change(emailInput, { target: { value: 'barbie@test.fr' } });
            fireEvent.change(passwordInput, { target: { value: 'awesomePass' } });
        });
        act(() => {
            fireEvent.click(component.getByRole('button', { name: 'Sauver les changements' }));
        });

        // Then
        waitFor(() => {
            expect(axiosMock.onPost('http://localhost:7878/auth')).toHaveBeenCalled();
            expect(axiosMock.onPost('http://localhost:7878/verify')).toHaveBeenCalled();
            expect(component.getByText('Un compte existe déjà avec cette adresse email.')).toBeInTheDocument();
        });
    });

    it('should update user profile', () => {
        // Given
        axiosMock.onPost('http://localhost:7878/auth').reply(200);
        axiosMock.onPost('http://localhost:7878/verify').reply(200, {
            exists: false
        });
        axiosMock.onPatch('http://localhost:7878/sign-in').reply(200, mockUser);
        const component = render(
            <Router>
                <UpdateProfileForm user={mockUser} />
            </Router>
        );
        const pseudoInput = component.getByLabelText('Pseudo *');
        const emailInput = component.getByLabelText('Adresse e-mail *');
        const passwordInput = component.getByLabelText('Votre mot de passe *');

        // When
        act(() => {
            fireEvent.change(pseudoInput, { target: { value: 'Barbie' } });
            fireEvent.change(emailInput, { target: { value: 'barbie@test.fr' } });
            fireEvent.change(passwordInput, { target: { value: 'awesomePass' } });
        });
        act(() => {
            fireEvent.click(component.getByRole('button', { name: 'Sauver les changements' }));
        });

        // Then
        waitFor(() => {
            expect(axiosMock.onPost('http://localhost:7878/auth')).toHaveBeenCalled();
            expect(axiosMock.onPost('http://localhost:7878/verify')).toHaveBeenCalled();
            expect(axiosMock.onPatch('http://localhost:7878/sign-in')).toHaveBeenCalled();
        });
    });
});
export {};

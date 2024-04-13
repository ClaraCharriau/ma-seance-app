import { act, fireEvent, render, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router } from 'react-router-dom';
import { axiosInstance } from '../../../client/axios.config';
import UpdatePasswordForm from './UpdatePasswordForm';

describe('UpdateProfileForm component tests', () => {
    let axiosMock: MockAdapter;
    const mockUser = {
        id: "1",
        pseudo: 'Jane',
        email: 'test@mail.com'
    };

    beforeEach(() => {
        axiosMock = new MockAdapter(axiosInstance);
    });

    afterEach(() => {
        axiosMock.reset();
    });

    it('should render profile update form', () => {
        // Given
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

    it('should set current password error if field is empty', () => {
        // Given
        const { getByLabelText, getByText, getByRole } = render(
            <Router>
                <UpdatePasswordForm user={mockUser} />
            </Router>
        );
        const oldPasswordInput = getByLabelText('Ancien mot de passe *');

        // When
        act(() => {
            fireEvent.change(oldPasswordInput, { target: { value: '' } });
        });
        act(() => {
            fireEvent.submit(getByRole('button', { name: 'Changer de mot de passe' }));
        });

        // Then
        waitFor(() => {
            expect(getByText('Entrez votre mot de passe actuel')).toBeInTheDocument();
        });
    });

    it('should set current password error if password is incorrect', () => {
        // Given
        axiosMock.onPost('/login').reply(200, null);
        const { getByLabelText, getByText, getByRole } = render(
            <Router>
                <UpdatePasswordForm user={mockUser} />
            </Router>
        );
        const oldPasswordInput = getByLabelText('Ancien mot de passe *');

        // When
        act(() => {
            fireEvent.change(oldPasswordInput, { target: { value: 'wrongPassword' } });
        });
        act(() => {
            fireEvent.submit(getByRole('button', { name: 'Changer de mot de passe' }));
        });

        // Then
        waitFor(() => {
            expect(getByText('Votre mot de passe actuel est erroné')).toBeInTheDocument();
            expect(axiosMock.onPost('/login')).toHaveBeenCalled();
        });
    });

    it('should set new password error if field is empty', () => {
        // Given
        axiosMock.onPost('/login').reply(200, mockUser);
        const component = render(
            <Router>
                <UpdatePasswordForm user={mockUser} />
            </Router>
        );
        const oldPasswordInput = component.getByLabelText('Ancien mot de passe *');
        const newPasswordInput = component.getByLabelText('Nouveau mot de passe *');

        // When
        act(() => {
            fireEvent.change(oldPasswordInput, { target: { value: 'awesomePassword' } });
            fireEvent.change(newPasswordInput, { target: { value: '' } });
        });
        act(() => {
            fireEvent.submit(component.getByRole('button', { name: 'Changer de mot de passe' }));
        });

        // Then
        waitFor(() => {
            expect(component.getByText('Entrez votre nouveau mot de passe')).toBeInTheDocument();
            expect(axiosMock.onPost('/login')).toHaveBeenCalled();
            expect(component.baseElement).toMatchSnapshot();
        });
    });

    it('should set new password bis error if field is empty', () => {
        // Given
        axiosMock.onPost('/login').reply(200, mockUser);
        const component = render(
            <Router>
                <UpdatePasswordForm user={mockUser} />
            </Router>
        );
        const oldPasswordInput = component.getByLabelText('Ancien mot de passe *');
        const newPasswordInput = component.getByLabelText('Nouveau mot de passe *');
        const newPasswordBisInput = component.getByLabelText('Confirmez le mot de passe *');

        // When
        act(() => {
            fireEvent.change(oldPasswordInput, { target: { value: 'awesomePassword' } });
            fireEvent.change(newPasswordInput, { target: { value: 'newPassword' } });
            fireEvent.change(newPasswordBisInput, { target: { value: '' } });
        });
        act(() => {
            fireEvent.submit(component.getByRole('button', { name: 'Changer de mot de passe' }));
        });

        // Then
        waitFor(() => {
            expect(component.getByText('Entrez une seconde fois votre nouveau mot de passe')).toBeInTheDocument();
            expect(axiosMock.onPost('/login')).toHaveBeenCalled();
        });
    });

    it('should set new password error if new password are not matching', () => {
        // Given
        axiosMock.onPost('/login').reply(200, mockUser);
        const component = render(
            <Router>
                <UpdatePasswordForm user={mockUser} />
            </Router>
        );
        const oldPasswordInput = component.getByLabelText('Ancien mot de passe *');
        const newPasswordInput = component.getByLabelText('Nouveau mot de passe *');
        const newPasswordBisInput = component.getByLabelText('Confirmez le mot de passe *');

        // When
        act(() => {
            fireEvent.change(oldPasswordInput, { target: { value: 'awesomePassword' } });
            fireEvent.change(newPasswordInput, { target: { value: 'newPassword' } });
            fireEvent.change(newPasswordBisInput, { target: { value: 'newerPass' } });
        });
        act(() => {
            fireEvent.submit(component.getByRole('button', { name: 'Changer de mot de passe' }));
        });

        // Then
        waitFor(() => {
            expect(component.getByText('Les mots de passe doivent être identiques')).toBeInTheDocument();
            expect(axiosMock.onPost('/login')).toHaveBeenCalled();
        });
    });

    it('should set new password error if password is under 8 characters', () => {
        // Given
        axiosMock.onPost('/login').reply(200, mockUser);
        const component = render(
            <Router>
                <UpdatePasswordForm user={mockUser} />
            </Router>
        );
        const oldPasswordInput = component.getByLabelText('Ancien mot de passe *');
        const newPasswordInput = component.getByLabelText('Nouveau mot de passe *');
        const newPasswordBisInput = component.getByLabelText('Confirmez le mot de passe *');

        // When
        act(() => {
            fireEvent.change(oldPasswordInput, { target: { value: 'awesomePassword' } });
            fireEvent.change(newPasswordInput, { target: { value: '123' } });
            fireEvent.change(newPasswordBisInput, { target: { value: '123' } });
        });
        act(() => {
            fireEvent.submit(component.getByRole('button', { name: 'Changer de mot de passe' }));
        });

        // Then
        waitFor(() => {
            expect(component.getByText('Le mot de passe doit contenir au moins 12 caractères, 1 majuscule, 1 minuscule et 1 chiffre')).toBeInTheDocument();
            expect(axiosMock.onPost('/login')).toHaveBeenCalled();
        });
    });

    it('should successfully update user password', () => {
        // Given
        axiosMock.onPost('/login').reply(200, mockUser);
        axiosMock.onPatch('/registrations').reply(200, mockUser);
        const component = render(
            <Router>
                <UpdatePasswordForm user={mockUser} />
            </Router>
        );
        const oldPasswordInput = component.getByLabelText('Ancien mot de passe *');
        const newPasswordInput = component.getByLabelText('Nouveau mot de passe *');
        const newPasswordBisInput = component.getByLabelText('Confirmez le mot de passe *');

        // When
        act(() => {
            fireEvent.change(oldPasswordInput, { target: { value: 'awesomePassword' } });
            fireEvent.change(newPasswordInput, { target: { value: '123456789' } });
            fireEvent.change(newPasswordBisInput, { target: { value: '123456789' } });
        });
        act(() => {
            fireEvent.click(component.getByRole('button', { name: 'Changer de mot de passe' }));
        });

        // Then
        waitFor(() => {
            expect(axiosMock.onPost('/login')).toHaveBeenCalled();
            expect(axiosMock.onPatch('/registrations')).toHaveBeenCalled();
        });
    });
});

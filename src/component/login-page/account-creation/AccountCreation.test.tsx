/* eslint-disable  @typescript-eslint/no-empty-function */
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../../../client/axios.config';
import mockUser from '../../../mocks/users/users.json';
import AccountCreation from './AccountCreation';

describe('AccountCreation component tests', () => {
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axiosInstance);
    });
    afterEach(() => {
        axiosMock.reset();
    });
    it('should render account creation component', () => {
        // Given
        const mockSignUpClickCallback = () => {
            console.log('click');
        };

        // When
        const component = render(<AccountCreation onSignUpClick={mockSignUpClickCallback} />);

        // Then
        expect(component.getByText('Créer un compte')).toBeInTheDocument();
        expect(component.getByLabelText('Pseudo *')).toBeInTheDocument();
        expect(component.getByLabelText('Adresse e-mail *')).toBeInTheDocument();
        expect(component.getByLabelText('Mot de passe *')).toBeInTheDocument();
        expect(component.getByLabelText('Confirmez le mot de passe *')).toBeInTheDocument();
        expect(component.getByText("S'inscrire")).toBeInTheDocument();
        expect(component.baseElement).toMatchSnapshot();
    });

    it('should create account', async () => {
        // Given
        axiosMock.onPost('/token').reply(200, {
            exists: false
        });
        axiosMock.onPost('/registrations').reply(200, mockUser);
        const { getByLabelText, getByRole } = render(<AccountCreation onSignUpClick={() => {}} />);
        const pseudoInput = getByLabelText('Pseudo *');
        const emailInput = getByLabelText('Adresse e-mail *');
        const passwordInput = getByLabelText('Mot de passe *');
        const confirmPasswordInput = getByLabelText('Confirmez le mot de passe *');

        // When
        act(() => {
            fireEvent.change(pseudoInput, { target: { value: 'TonySoprano' } });
            fireEvent.change(emailInput, { target: { value: 'toto@mail.it' } });
            fireEvent.change(passwordInput, { target: { value: 'awesomePassword123' } });
            fireEvent.change(confirmPasswordInput, { target: { value: 'awesomePassword123' } });
        });
        act(() => {
            fireEvent.submit(getByRole('button', { name: "S'inscrire" }));
        });

        // Then
        await waitFor(() => {
            expect(axiosMock.history.post.length).toBe(2);
            expect(axiosMock.history.post[0].url).toBe('/token');
            expect(axiosMock.history.post[0].data).toEqual('{"email":"toto@mail.it"}');
            expect(axiosMock.history.post[1].url).toBe('/registrations');
            expect(axiosMock.history.post[1].data).toEqual(
                '{"pseudo":"TonySoprano","email":"toto@mail.it","password":"awesomePassword123"}'
            );
        });
    });

    it('should set already existing account error', async () => {
        // Given
        axiosMock.onPost('/token').reply(200, {
            exists: true
        });
        const { getByLabelText, getByText, getByRole } = render(<AccountCreation onSignUpClick={() => {}} />);
        const pseudoInput = getByLabelText('Pseudo *');
        const emailInput = getByLabelText('Adresse e-mail *');

        // When
        act(() => {
            fireEvent.change(pseudoInput, { target: { value: 'TonySoprano' } });
            fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
        });
        act(() => {
            fireEvent.submit(getByRole('button', { name: "S'inscrire" }));
        });

        // Then
        await waitFor(() => {
            expect(getByText('Un compte existe déjà avec cette adresse email.')).toBeInTheDocument();
        });
    });

    it('should return false and set missing pseudo error', async () => {
        // Given
        axiosMock.onPost('/token').reply(200, {
            exists: false
        });
        const { getByLabelText, getByText, getByRole } = render(<AccountCreation onSignUpClick={() => {}} />);
        const pseudoInput = getByLabelText('Pseudo *');

        // When
        act(() => {
            fireEvent.change(pseudoInput, { target: { value: '' } });
        });
        act(() => {
            fireEvent.submit(getByRole('button', { name: "S'inscrire" }));
        });

        // Then
        await waitFor(() => {
            expect(getByText('Choisissez un pseudo.')).toBeInTheDocument();
            expect(getByText("Une erreur s'est produite.")).toBeInTheDocument();
        });
    });

    it('should return false and set missing pseudo error', async () => {
        // Given
        axiosMock.onPost('/token').reply(200, {
            exists: false
        });
        const { getByLabelText, getByText, getByRole } = render(<AccountCreation onSignUpClick={() => {}} />);
        const pseudoInput = getByLabelText('Pseudo *');

        // When
        act(() => {
            fireEvent.change(pseudoInput, { target: { value: 'luc' } });
        });
        act(() => {
            fireEvent.submit(getByRole('button', { name: "S'inscrire" }));
        });

        // Then
        await waitFor(() => {
            expect(getByText('Votre pseudo doit contenir plus de 4 caractères.')).toBeInTheDocument();
        });
    });

    it('should return false and set missing email error', async () => {
        // Given
        axiosMock.onPost('/token').reply(200, {
            exists: false
        });
        const { getByLabelText, getByText, getByRole } = render(<AccountCreation onSignUpClick={() => {}} />);
        const pseudoInput = getByLabelText('Pseudo *');
        const emailInput = getByLabelText('Adresse e-mail *');

        // When
        act(() => {
            fireEvent.change(pseudoInput, { target: { value: 'TonySoprano' } });
            fireEvent.change(emailInput, { target: { value: '' } });
        });
        act(() => {
            fireEvent.submit(getByRole('button', { name: "S'inscrire" }));
        });

        // Then
        await waitFor(() => {
            expect(getByText('Entrez votre adresse email.')).toBeInTheDocument();
        });
    });

    it('should return false and set invalid email error', async () => {
        // Given
        axiosMock.onPost('/token').reply(200, {
            exists: false
        });
        const { getByLabelText, getByText, getByRole } = render(<AccountCreation onSignUpClick={() => {}} />);
        const pseudoInput = getByLabelText('Pseudo *');
        const emailInput = getByLabelText('Adresse e-mail *');

        // When
        act(() => {
            fireEvent.change(pseudoInput, { target: { value: 'TonySoprano' } });
            fireEvent.change(emailInput, { target: { value: 'invalidmail' } });
        });
        act(() => {
            fireEvent.submit(getByRole('button', { name: "S'inscrire" }));
        });

        // Then
        await waitFor(() => {
            expect(getByText("Merci d'entrer une adresse email valide.")).toBeInTheDocument();
        });
    });

    it('should return false and set missing password error', async () => {
        // Given
        axiosMock.onPost('/token').reply(200, {
            exists: false
        });
        const { getByLabelText, getByText, getByRole } = render(<AccountCreation onSignUpClick={() => {}} />);
        const pseudoInput = getByLabelText('Pseudo *');
        const emailInput = getByLabelText('Adresse e-mail *');
        const passwordInput = getByLabelText('Mot de passe *');

        // When
        act(() => {
            fireEvent.change(pseudoInput, { target: { value: 'TonySoprano' } });
            fireEvent.change(emailInput, { target: { value: 'toto@mail.com' } });
            fireEvent.change(passwordInput, { target: { value: '' } });
        });
        act(() => {
            fireEvent.submit(getByRole('button', { name: "S'inscrire" }));
        });

        // Then
        await waitFor(() => {
            expect(getByText('Entrez votre mot de passe')).toBeInTheDocument();
        });
    });

    it('should return false and set unmaching password error', async () => {
        // Given
        axiosMock.onPost('/token').reply(200, {
            exists: false
        });
        const { getByLabelText, getByText, getByRole } = render(<AccountCreation onSignUpClick={() => {}} />);
        const pseudoInput = getByLabelText('Pseudo *');
        const emailInput = getByLabelText('Adresse e-mail *');
        const passwordInput = getByLabelText('Mot de passe *');
        const confirmPasswordInput = getByLabelText('Confirmez le mot de passe *');

        // When
        act(() => {
            fireEvent.change(pseudoInput, { target: { value: 'TonySoprano' } });
            fireEvent.change(emailInput, { target: { value: 'toto@mail.com' } });
            fireEvent.change(passwordInput, { target: { value: 'pass123' } });
            fireEvent.change(confirmPasswordInput, { target: { value: 'pass456' } });
        });
        act(() => {
            fireEvent.submit(getByRole('button', { name: "S'inscrire" }));
        });

        // Then
        await waitFor(() => {
            expect(getByText('Les mots de passe doivent être identiques.')).toBeInTheDocument();
        });
    });

    it('should return false and set longer password error', async () => {
        // Given
        axiosMock.onPost('/token').reply(200, {
            exists: false
        });
        const { getByLabelText, getByText, getByRole } = render(<AccountCreation onSignUpClick={() => {}} />);
        const pseudoInput = getByLabelText('Pseudo *');
        const emailInput = getByLabelText('Adresse e-mail *');
        const passwordInput = getByLabelText('Mot de passe *');
        const confirmPasswordInput = getByLabelText('Confirmez le mot de passe *');

        // When
        act(() => {
            fireEvent.change(pseudoInput, { target: { value: 'TonySoprano' } });
            fireEvent.change(emailInput, { target: { value: 'toto@mail.com' } });
            fireEvent.change(passwordInput, { target: { value: '123' } });
            fireEvent.change(confirmPasswordInput, { target: { value: '123' } });
        });
        act(() => {
            fireEvent.submit(getByRole('button', { name: "S'inscrire" }));
        });

        // Then
        await waitFor(() => {
            expect(getByText('Le mot de passe doit contenir au moins 8 caractères')).toBeInTheDocument();
        });
    });
});
export { };


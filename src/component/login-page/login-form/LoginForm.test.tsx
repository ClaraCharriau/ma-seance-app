import { fireEvent, render, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';
import { BrowserRouter as Router } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}));

describe('LoginForm component tests', () => {
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
    });
    afterEach(() => {
        axiosMock.reset();
    });

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

    it('should login existing user', async () => {
        // Given
        axiosMock.onPost('http://localhost:7878/verify').reply(200, {
            exists: true
        });
        axiosMock.onPost('http://localhost:7878/auth').reply(200, {
            id: 678,
            email: 'toto@mail.it',
            pseudo: 'tonySoprano'
        });
        const navigate = jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => jest.fn());
        const { getByLabelText, getByRole } = render(
            <Router>
                <LoginForm />
            </Router>
        );
        const emailInput = getByLabelText('Adresse e-mail');
        const passwordInput = getByLabelText('Mot de passe');

        // When
        act(() => {
            fireEvent.change(emailInput, { target: { value: 'toto@mail.it' } });
            fireEvent.change(passwordInput, { target: { value: 'awesomePassword123' } });
        });
        act(() => {
            fireEvent.submit(getByRole('button', { name: 'Connexion' }));
        });

        // Then
        await waitFor(() => {
            expect(navigate).toHaveBeenCalled();
            expect(axiosMock.history.post.length).toBe(2);
            expect(axiosMock.history.post[0].url).toBe('http://localhost:7878/verify');
            expect(axiosMock.history.post[0].data).toEqual('{"email":"toto@mail.it"}');
            expect(axiosMock.history.post[1].url).toBe('http://localhost:7878/auth');
            expect(axiosMock.history.post[1].data).toEqual('{"email":"toto@mail.it","password":"awesomePassword123"}');
        });
    });

    it('should set non existing user error', async () => {
        // Given
        axiosMock.onPost('http://localhost:7878/verify').reply(200, {
            exists: false
        });
        const { getByLabelText, getByText, getByRole } = render(
            <Router>
                <LoginForm />
            </Router>
        );
        const emailInput = getByLabelText('Adresse e-mail');
        const passwordInput = getByLabelText('Mot de passe');

        // When
        act(() => {
            fireEvent.change(emailInput, { target: { value: 'toto@mail.com' } });
            fireEvent.change(passwordInput, { target: { value: 'pass123' } });
        });
        act(() => {
            fireEvent.submit(getByRole('button', { name: 'Connexion' }));
        });

        // Then
        await waitFor(() => {
            expect(getByText("Nous n'avons pas trouvé de compte relié à cette adresse mail.")).toBeInTheDocument();
        });
    });

    it('should return false and set missing email error', async () => {
        // Given
        axiosMock.onPost('http://localhost:7878/verify').reply(200, {
            exists: true
        });
        const { getByLabelText, getByText, getByRole } = render(
            <Router>
                <LoginForm />
            </Router>
        );
        const emailInput = getByLabelText('Adresse e-mail');

        // When
        act(() => {
            fireEvent.change(emailInput, { target: { value: '' } });
        });
        act(() => {
            fireEvent.submit(getByRole('button', { name: 'Connexion' }));
        });

        // Then
        await waitFor(() => {
            expect(getByText('Entrez votre adresse email.')).toBeInTheDocument();
        });
    });

    it('should return false and set invalid email error', async () => {
        // Given
        axiosMock.onPost('http://localhost:7878/verify').reply(200, {
            exists: true
        });
        const { getByLabelText, getByText, getByRole } = render(
            <Router>
                <LoginForm />
            </Router>
        );
        const emailInput = getByLabelText('Adresse e-mail');

        // When
        act(() => {
            fireEvent.change(emailInput, { target: { value: 'tacatca' } });
        });
        act(() => {
            fireEvent.submit(getByRole('button', { name: 'Connexion' }));
        });

        // Then
        await waitFor(() => {
            expect(getByText("Merci d'entrer une adresse email valide.")).toBeInTheDocument();
        });
    });

    it('should return false and set missing password error', async () => {
        // Given
        axiosMock.onPost('http://localhost:7878/verify').reply(200, {
            exists: true
        });
        const { getByLabelText, getByText, getByRole } = render(
            <Router>
                <LoginForm />
            </Router>
        );
        const emailInput = getByLabelText('Adresse e-mail');
        const passwordInput = getByLabelText('Mot de passe');

        // When
        act(() => {
            fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
            fireEvent.change(passwordInput, { target: { value: '' } });
        });
        act(() => {
            fireEvent.submit(getByRole('button', { name: 'Connexion' }));
        });

        // Then
        await waitFor(() => {
            expect(getByText('Entrez votre mot de passe')).toBeInTheDocument();
        });
    });
});
export {};

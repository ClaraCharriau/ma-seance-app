/* eslint-disable  @typescript-eslint/no-explicit-any */
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../context/auth.context';
import mockToken from '../../mocks/auth/user-token.json';
import Profile from './Profile';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}));

describe('Profile page component tests', () => {
    const navigate = jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => jest.fn());
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
        localStorage.setItem('maSeanceId', JSON.stringify(mockToken));
    });

    afterEach(() => {
        axiosMock.reset();
        navigate.mockRestore();
    });

    it('should render profile page', () => {
        // When
        const component = render(
            <AuthProvider>
                <Router>
                    <Profile />
                </Router>
            </AuthProvider>
        );
        // Then
        expect(component.baseElement).toMatchSnapshot();
    });

    it('should log out user on click on "Déconnexion" button', () => {
        // Given
        const navigate = jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => jest.fn());
        let component: any;
        act(() => {
            component = render(
                <AuthProvider>
                    <Router>
                        <Profile />
                    </Router>
                </AuthProvider>
            );
        });
        const clearCurrentUserToken = jest.fn();
        jest.spyOn(require('../../context/auth.context'), 'useAuthContext').mockReturnValueOnce({ clearCurrentUserToken });

        // When
        act(() => {
            fireEvent.click(component.getByRole('button', { name: 'Déconnexion' }));
        });

        // Then
        waitFor(() => {
            expect(clearCurrentUserToken).toHaveBeenCalled();
            expect(navigate).toHaveBeenCalled();
            expect(window.location.pathname).toEqual('/login');
        });
    });

    it('should close modale on click on "annuler" button', () => {
        // Given
        let component: any;
        act(() => {
            component = render(
                <AuthProvider>
                    <Router>
                        <Profile />
                    </Router>
                </AuthProvider>
            );
        });

        // When
        waitFor(() => {
            fireEvent.click(component.getByRole('button', { name: 'Supprimer mon compte' }));
        });
        waitFor(() => {
            fireEvent.click(component.getByRole('button', { name: 'annuler' }));
        });

        // Then
        waitFor(async () => {
            expect(component.getByText('Paramètres de votre profil')).toBeInTheDocument();
            expect(
                component.getByText(
                    'Êtes-vous bien sûr de vouloir supprimer votre compte ? ⚠️ Cette action est irréversible.'
                )
            ).not.toBeInTheDocument();
        });
    });

    it('should open modale on click on "Supprimer mon compte" button', () => {
        // Given
        let component: any;
        act(() => {
            component = render(
                <AuthProvider>
                    <Router>
                        <Profile />
                    </Router>
                </AuthProvider>
            );
        });

        // When
        waitFor(() => {
            fireEvent.click(component.getByRole('button', { name: 'Supprimer mon compte' }));
        });

        // Then
        expect(component.baseElement).toMatchSnapshot();
        expect(
            component.getByText(
                'Êtes-vous bien sûr de vouloir supprimer votre compte ? ⚠️ Cette action est irréversible.'
            )
        ).toBeInTheDocument();
    });

    it('should delete account on click on "confirmer" button on modale', () => {
        // Given
        let component: any;
        axiosMock.onDelete('sign-out/3658f41e-4d56-4980-93a9-621eab2ad3b2').reply(200);
        const navigate = jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => jest.fn());
        act(() => {
            component = render(
                <AuthProvider>
                    <Router>
                        <Profile />
                    </Router>
                </AuthProvider>
            );
        });
        waitFor(() => {
            fireEvent.click(component.getByRole('button', { name: 'Supprimer mon compte' }));
        });

        // When
        act(() => {
            fireEvent.click(component.getByRole('button', { name: 'confirmer' }));
        });

        // Then
        waitFor(() => {
            expect(axiosMock.onDelete).toHaveBeenCalled();
            expect(navigate).toHaveBeenCalled();
        });
    });
});

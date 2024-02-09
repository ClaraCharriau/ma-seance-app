/* eslint-disable  @typescript-eslint/no-explicit-any */
import { fireEvent, render, waitFor } from '@testing-library/react';
import Profile from './Profile';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../context/auth.context';
import { act } from 'react-dom/test-utils';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}));

describe('Profile page component tests', () => {
    const navigate = jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => jest.fn());
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
        const mockUser = {
            id: 1,
            pseudo: 'Jane',
            email: 'test@gmail.com'
        };
        localStorage.setItem('user', JSON.stringify(mockUser));
    });

    afterEach(() => {
        axiosMock.reset();
        navigate.mockRestore();
    });

    it('should render profile page', () => {
        // Given
        let component: any;

        // When
        act(() => {
            component = render(
                <AuthProvider>
                    <Router>
                        <Profile />
                    </Router>
                </AuthProvider>
            );
        });

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
        const clearCurrentUser = jest.fn();
        jest.spyOn(require('../../context/auth.context'), 'useAuthContext').mockReturnValueOnce({ clearCurrentUser });

        // When
        act(() => {
            fireEvent.click(component.getByRole('button', { name: 'Déconnexion' }));
        });

        // Then
        waitFor(() => {
            expect(clearCurrentUser).toHaveBeenCalled();
            expect(navigate).toHaveBeenCalled();
            expect(window.location.pathname).toEqual('/login');
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
        waitFor(() => {
            expect(component.baseElement).toMatchSnapshot();
            expect(component.getByText('Paramètres de votre profil')).toBeInTheDocument();
            expect(
                component.getByText(
                    'Êtes-vous bien sûr de vouloir supprimer votre compte ? ⚠️ Cette action est irréversible.'
                )
            ).not.toBeInTheDocument();
        });
    });

    it('should delete account on click on "confirmer" button on modale', () => {
        // Given
        let component: any;
        axiosMock.onDelete('http://localhost:7878/sign-out/1').reply(200);
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

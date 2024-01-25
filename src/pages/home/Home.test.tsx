import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuthContext } from '../../context/auth.context'; // Assurez-vous de corriger le chemin d'importation selon votre arborescence
import Home, { homeLoader } from './Home';

describe('Home Component', () => {
    it('renders Home component', () => {
        render(<Home />);

        expect(screen.getByText('Welcome')).toBeInTheDocument();
    });

    it('redirects to login when not logged in', async () => {
        // Mock du context ou du currentUser
        // Mock du local storage
        // Spy sur le fonction redirect
        // // When
        // await homeLoader();
        // // Then
        // // Vérif si la fonction redirect est appelée avec le bon path
        // expect(redirectMock).toHaveBeenCalledWith('/login');
    });
});

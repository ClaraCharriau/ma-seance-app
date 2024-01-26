import { render, screen } from '@testing-library/react';
import Home from './Home';

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

import { fireEvent, render } from "@testing-library/react";
import Login from "./Login";
import { BrowserRouter as Router } from 'react-router-dom';

describe('Login page tests', () => {

    it('should renders Login form with buttons', () => {
        // Given
        const { getByText } = render(
            <Router>
              <Login />
            </Router>
          );
      
        // Then
        expect(getByText('Se connecter')).toBeInTheDocument();
        expect(getByText('Créer un compte')).toBeInTheDocument();
      });

      it('should switches to login form when "Se connecter" button is clicked', () => {
        // Given
        const { getByText } = render(
            <Router>
              <Login />
            </Router>
          );
      
        // When
        fireEvent.click(getByText('Se connecter'));
      
        // Than
        expect(getByText('Retour')).toBeInTheDocument();
        expect(getByText('maSéance')).toBeInTheDocument();
        expect(getByText('Organisez votre agenda cinéma')).toBeInTheDocument();
      });

      it('should switches to account creation form when "Créer un compte" button is clicked', () => {
        // Given
        const { getByText } = render(
            <Router>
              <Login />
            </Router>
          );
      
        // When
        fireEvent.click(getByText('Créer un compte'));
      
        // Then
        expect(getByText('Retour')).toBeInTheDocument();
      });

      test('switches back to initial form when "Retour" button is clicked in login form', () => {
        // Given
        const { getByText } = render(
            <Router>
              <Login />
            </Router>
          );

        // When
        fireEvent.click(getByText('Se connecter'));
        fireEvent.click(getByText('Retour'));
      
        // Then
        expect(getByText('Se connecter')).toBeInTheDocument();
        expect(getByText('Créer un compte')).toBeInTheDocument();
      });

      test('switches back to initial form when "Retour" button is clicked in account creation form', () => {
        // Given
        const { getByText } = render(
            <Router>
              <Login />
            </Router>
          );

        // When
        fireEvent.click(getByText('Créer un compte'));
        fireEvent.click(getByText('Retour'));
      
        // Then
        expect(getByText('Se connecter')).toBeInTheDocument();
        expect(getByText('Créer un compte')).toBeInTheDocument();
      });
});

export {};

import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component tests', () => {
    it('should render Footer with buttons', () => {
        // Given
        const { getByText } = render(
            <Router>
                <Footer />
            </Router>
        );

        // Then
        expect(getByText('accueil')).toBeInTheDocument();
        expect(getByText('recherche')).toBeInTheDocument();
        expect(getByText('watchlist')).toBeInTheDocument();
        expect(getByText('agenda')).toBeInTheDocument();
        expect(getByText('compte')).toBeInTheDocument();
    });
});

import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../header/Header';
import { render } from '@testing-library/react';

it('should render Header with logo, buttons and searchbar', () => {
    // Given
    const { getByText, getByPlaceholderText } = render(
        <Router>
            <Header />
        </Router>
    );

    // Then
    expect(getByText('maSéance')).toBeInTheDocument();
    expect(getByPlaceholderText('Rechercher un cinéma, un film...')).toBeInTheDocument();
    expect(getByText('wishlist')).toBeInTheDocument();
    expect(getByText('agenda')).toBeInTheDocument();
    expect(getByText('compte')).toBeInTheDocument();
});

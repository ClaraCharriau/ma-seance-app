import { render } from '@testing-library/react';
import Searchbar from './Searchbar';

it('should render search bar', () => {
    // Given
    const { getByPlaceholderText } = render(<Searchbar />);

    // Then
    expect(getByPlaceholderText('Rechercher un cinéma, un film...')).toBeInTheDocument();
});

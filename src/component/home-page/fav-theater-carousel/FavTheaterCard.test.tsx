import { render } from '@testing-library/react';
import FavTheaterCard from './FavTheaterCard';
import { BrowserRouter } from 'react-router-dom';

describe('Fav Theater Card Component', () => {
    it('renders Fav Theater Card component', () => {
        const mockTheater = {
            id: 1,
            name: 'Le Grand Rex',
            address: '',
            imgPath: ''
        };

        const component = render(
            <BrowserRouter>
                <FavTheaterCard theater={mockTheater} />
            </BrowserRouter>
        );

        expect(component.getByText('Le Grand Rex')).toBeInTheDocument();
        expect(component.container).toMatchSnapshot();
    });
});

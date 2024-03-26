import { render } from '@testing-library/react';
import FavTheaterCard from './FavTheaterCard';
import { BrowserRouter } from 'react-router-dom';
import mockTheater from '../../../mocks/theaters/theaters-6.json';

describe('Fav Theater Card Component', () => {
    it('renders Fav Theater Card component', () => {
        const component = render(
            <BrowserRouter>
                <FavTheaterCard theater={mockTheater} />
            </BrowserRouter>
        );

        expect(component.getByText('UGC Normandie')).toBeInTheDocument();
        expect(component.container).toMatchSnapshot();
    });
});

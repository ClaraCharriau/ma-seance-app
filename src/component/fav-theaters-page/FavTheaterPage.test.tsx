import { render } from '@testing-library/react';
import FavTheaters from './FavTheaterPage';

describe('Favorite theaters Component', () => {
    it('renders favorite theaters component', () => {
        const component = render(<FavTheaters />);

        expect(component.container).toMatchSnapshot();
    });
});

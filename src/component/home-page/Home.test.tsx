import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home Component', () => {
    it('renders Home component', () => {
        const component = render(<Home />);

        expect(component.container).toMatchSnapshot();
    });
});

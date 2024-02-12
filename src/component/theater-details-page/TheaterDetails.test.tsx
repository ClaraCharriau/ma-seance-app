import { render } from '@testing-library/react';
import TheaterDetails from './TheaterDetails';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLoaderData: () => {
        return {
            id: 1,
            name: 'UGC Normandie',
            address: '116 bis Av. des Champs-Élysées 75008 Paris',
            imgPath: '/ugc-normandie-paris'
        };
    }
}));

describe('Theater Details Component', () => {
    it('renders theater details component', () => {
        const component = render(<TheaterDetails />);

        expect(component.container).toMatchSnapshot();
    });
});

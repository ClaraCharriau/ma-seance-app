import { act, render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TheaterDetailsLayout from './TheaterDetailsLayout';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLoaderData: () => {
        return {
            theater: {
                id: 1,
                name: 'UGC Normandie',
                address: '116 bis Av. des Champs-Élysées 75008 Paris',
                imgPath: '/ugc-normandie-paris'
            }
        };
    }
}));

describe('Theater Details Component', () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    it('renders theater details component', () => {
        // Given
        let component: any;

        // When
        act(() => {
            component = render(
                <BrowserRouter>
                    <TheaterDetailsLayout />
                </BrowserRouter>
            );
        });

        // Then
        waitFor(() => {
            expect(component.container).toMatchSnapshot();
        });
    });
});

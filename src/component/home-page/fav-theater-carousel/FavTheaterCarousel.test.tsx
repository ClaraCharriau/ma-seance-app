import { render, waitFor } from '@testing-library/react';
import FavTheaterCarousel from './FavTheaterCarousel';
import { getUserFavTheaters } from '../../../client/users/user.client';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../../client/users/user.client', () => ({
    getUserFavTheaters: jest.fn()
}));
const mockGetUserFavTheaters = getUserFavTheaters as jest.MockedFunction<typeof getUserFavTheaters>;

describe('Fav Theater Carousel Component', () => {
    it('renders Fav Theater Carousel component', async () => {
        const mockUser = {
            id: 1,
            pseudo: 'Jane',
            email: 'test@mail.com'
        };
        const mockFavTheaters = [
            {
                id: 1,
                name: 'Le Grand Rex',
                address: '',
                imgPath: ''
            },
            {
                id: 2,
                name: 'Pathé Levallois',
                address: '',
                imgPath: ''
            },
            {
                id: 3,
                name: 'Super cinoche',
                address: '',
                imgPath: ''
            }
        ];
        mockGetUserFavTheaters.mockResolvedValueOnce(mockFavTheaters);

        const component = render(
            <BrowserRouter>
                <FavTheaterCarousel currentUser={mockUser} />
            </BrowserRouter>
        );

        await waitFor(() => {
            mockFavTheaters.forEach(theater => {
                expect(component.getByText(theater.name)).toBeInTheDocument();
            });
        });
        expect(component.container).toMatchSnapshot();
    });
});

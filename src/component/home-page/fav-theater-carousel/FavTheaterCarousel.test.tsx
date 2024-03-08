import { render, waitFor } from '@testing-library/react';
import FavTheaterCarousel from './FavTheaterCarousel';
import { getUserFavTheaters } from '../../../client/users/user.client';
import { BrowserRouter } from 'react-router-dom';
import { Theater } from '../../../models/Theater';

jest.mock('../../../client/users/user.client', () => ({
    getUserFavTheaters: jest.fn()
}));
const mockGetUserFavTheaters = getUserFavTheaters as jest.MockedFunction<typeof getUserFavTheaters>;

describe('Fav Theater Carousel Component', () => {
    it('renders Fav Theater Carousel component', async () => {
        const mockUser = {
            id: "1",
            pseudo: 'Jane',
            email: 'test@mail.com'
        };
        const mockFavTheaters = [
            {
                id: '1',
                name: 'Le Grand Rex',
                address: '',
                imgPath: ''
            },
            {
                id: '2',
                name: 'Pathé Levallois',
                address: '',
                imgPath: ''
            },
            {
                id: '3',
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

    it('renders Fav Theater Carousel component when user has no favorite theaters', async () => {
        const mockUser = {
            id: "1",
            pseudo: 'Jane',
            email: 'test@mail.com'
        };
        const mockEmptyFavTheaters: Theater[] = [];
        mockGetUserFavTheaters.mockResolvedValueOnce(mockEmptyFavTheaters);

        const component = render(
            <BrowserRouter>
                <FavTheaterCarousel currentUser={mockUser} />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(component.getByText("Vous n'avez pas encore de cinémas favoris")).toBeInTheDocument();
            expect(component.container).toMatchSnapshot();});
    });

    it('renders Fav Theater Carousel component when an error happened', async () => {
        const mockUser = {
            id: "1",
            pseudo: 'Jane',
            email: 'test@mail.com'
        };
        mockGetUserFavTheaters.mockRejectedValue({});

        const component = render(
            <BrowserRouter>
                <FavTheaterCarousel currentUser={mockUser} />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(component.getByText("Une erreur s'est produite lors du chargement des cinémas. Veuillez réessayer.")).toBeInTheDocument();
            expect(component.container).toMatchSnapshot();
        });
    });
});

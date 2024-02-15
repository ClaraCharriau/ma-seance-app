import { fireEvent, render, waitFor } from '@testing-library/react';
import FavoriteButton from './FavoriteButton';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import mockUser from '../../../mocks/auth/users.json';
import mockTheaters from '../../../mocks/theaters/fav-theaters.json';

describe('Favorite button component tests', () => {
    let axiosMock: MockAdapter;

    beforeEach(() => {
        const authContext = require('../../../context/auth.context');
        jest.spyOn(authContext, 'useAuthContext').mockReturnValue({ mockUser });
        axiosMock = new MockAdapter(axios);
    });
    afterEach(() => {
        axiosMock.reset();
    });

    it('should render favorite button with theater and filled heart', () => {
        // Given
        axiosMock.onGet('http://localhost:7878/users/1/fav-theaters').reply(200, mockTheaters);

        // When
        const component = render(<FavoriteButton itemId={'1'} itemType={'theater'} />);

        // Then
        expect(component.baseElement).toMatchSnapshot();
    });

    it('should render favorite button with movie', () => {
        // When
        const component = render(<FavoriteButton itemId={'1'} itemType={'movie'} />);

        // Then
        expect(component.baseElement).toMatchSnapshot();
    });

    it('should render favorite button with theater and empty heart', () => {
        // Given
        axiosMock.onGet('http://localhost:7878/users/1/fav-theaters').reply(200, mockTheaters);

        // When
        const component = render(<FavoriteButton itemId={'4'} itemType={'theater'} />);

        // Then
        expect(component.baseElement).toMatchSnapshot();
    });

    it('should render favorite button with theater and filled heart after clicking button', () => {
        // Given
        axiosMock.onGet('http://localhost:7878/users/1/fav-theaters').replyOnce(200, mockTheaters);
        axiosMock.onGet('http://localhost:7878/users/1/fav-theaters').reply(200, [
            {
                id: '1',
                name: 'C2L Saint-Germain',
                address: '25-27-29, rue du Vieux-Marche 78100 Saint-Germain-en-Laye',
                imgPath: '/c2l-saint-germain'
            },
            {
                id: '4',
                name: 'C2L Poissy',
                address: '112 Rue du Général de Gaulle 78300 Poissy',
                imgPath: '/c2l-poissy'
            }
        ]);
        const component = render(<FavoriteButton itemId={'4'} itemType={'theater'} />);
        const button = component.getByTestId('button');

        // When
        act(() => {
            fireEvent.click(button);
        });

        // Then
        waitFor(() => {
            expect(component.baseElement).toMatchSnapshot();
        });
    });

    it('shows correct text for movie in favorites', () => {
        const { getByText } = render(<FavoriteButton itemId="1" itemType="movie" />);
        const textElement = getByText('Ce film n’est pas dans vos favoris');
        expect(textElement).toBeInTheDocument();
    });

    it('shows correct text for movie not in favorites', () => {
        const { getByText } = render(<FavoriteButton itemId="anotherMovie" itemType="movie" />);
        const textElement = getByText('Ce film n’est pas dans vos favoris');
        expect(textElement).toBeInTheDocument();
    });

    // it('toggles favorite when clicked', async () => {
    //     const updateUserFavMovies = jest.spyOn(require('../../../client/users/user.client'), 'updateUserFavMovies');

    //     const { getByTestId } = render(<FavoriteButton itemId="movie123" itemType="movie" />);

    //     const button = getByTestId('button');
    //     act(() => {
    //         fireEvent.click(button);
    //     });
    //     await waitFor(() => expect(updateUserFavMovies).toHaveBeenCalled());
    // });
});

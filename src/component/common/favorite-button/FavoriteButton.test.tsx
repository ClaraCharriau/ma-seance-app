import { act, fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockMovies from '../../../mocks/users/fav-movies.json';
import mockTheaters from '../../../mocks/users/fav-theaters.json';
import mockUser from '../../../mocks/users/users.json';
import FavoriteButton from './FavoriteButton';

describe('Favorite button component tests', () => {
    const favoriteContext = require('../../../context/favorite.context');
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
        jest.spyOn(favoriteContext, 'useFavoriteContext').mockReturnValue({
            favoriteTheaters: mockTheaters
        });
        axiosMock.onGet('users/1/fav-theaters').reply(200, mockTheaters);

        // When
        const component = render(<FavoriteButton itemId={'1'} itemType={'theater'} />);

        // Then
        expect(component.baseElement).toMatchSnapshot();
    });

    it('should render favorite button with theater and empty heart', () => {
        // Given
        jest.spyOn(favoriteContext, 'useFavoriteContext').mockReturnValue({
            favoriteTheaters: mockTheaters
        });
        axiosMock.onGet('users/1/fav-theaters').reply(200, mockTheaters);

        // When
        const component = render(<FavoriteButton itemId={'10'} itemType={'theater'} />);

        // Then
        expect(component.baseElement).toMatchSnapshot();
    });

    it('should render favorite button with theater and filled heart after clicking button', () => {
        // Given
        const updateUserFavTheaters = jest.spyOn(require('../../../client/users/user.client'), 'updateUserFavTheaters');
        jest.spyOn(favoriteContext, 'useFavoriteContext').mockReturnValue({
            favoriteTheaters: mockTheaters
        });
        axiosMock.onGet('users/1/fav-theaters').replyOnce(200, [
            {
                id: '1',
                name: 'C2L Saint-Germain',
                address: '25-27-29, rue du Vieux-Marche 78100 Saint-Germain-en-Laye',
                imgPath: '/c2l-saint-germain'
            }
        ]);
        axiosMock.onGet('users/1/fav-theaters').reply(200, [
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
            expect(updateUserFavTheaters).toHaveBeenCalledWith(1, '4');
        });
    });

    it('shows correct text for movie in watchlist', () => {
        // Given
        const movieId = '3d8f1342-15f1-44b1-a48f-4581d654b94a';
        jest.spyOn(favoriteContext, 'useFavoriteContext').mockReturnValue({
            favoriteMovies: mockMovies.records
        });

        // When
        const { getByText } = render(<FavoriteButton itemId={movieId} itemType="movie" />);

        // Then
        const textElement = getByText('Ce film est dans votre watchlist');
        expect(textElement).toBeInTheDocument();
    });

    it('shows correct text for movie not in watchlist', () => {
        // Given
        jest.spyOn(favoriteContext, 'useFavoriteContext').mockReturnValue({
            favoriteMovies: mockMovies.records
        });

        // When
        const { getByText } = render(<FavoriteButton itemId="anotherMovie" itemType="movie" />);

        // Then
        const textElement = getByText('Ce film n’est pas dans votre watchlist');
        expect(textElement).toBeInTheDocument();
    });

    it('should render favorite button with movie and filled heart after clicking button', () => {
        // Given
        const updateUserFavMovies = jest.spyOn(require('../../../client/users/user.client'), 'updateUserFavMovies');
        jest.spyOn(favoriteContext, 'useFavoriteContext').mockReturnValue({
            favoriteMovies: mockMovies.records
        });
        axiosMock.onGet('users/1/fav-movies').replyOnce(200, mockMovies);
        axiosMock.onGet('users/1/fav-movies').reply(200, [
            {
                id: 'b88f9510-d302-47d5-9d6b-8b13740f541d',
                title: 'Madame Web',
                releaseDate: '2024-02-14',
                duration: 90,
                resume: 'Cassandra Web est une ambulancière de Manhattan qui serait capable de voir dans le futur. Forcée de faire face à des révélations sur son passé, elle noue une relation avec trois jeunes femmes destinées à un avenir hors du commun... si toutefois elles parviennent à survivre à un présent mortel.',
                trailerLink: '',
                posterLink: '/rULWuutDcN5NvtiZi4FRPzRYWSh.jpg',
                photoLink: '',
                directors: [''],
                cast: [''],
                genres: ['']
            }
        ]);
        const component = render(<FavoriteButton itemId={'b88f9510-d302-47d5-9d6b-8b13740f541d'} itemType={'movie'} />);
        const button = component.getByTestId('button');

        // When
        act(() => {
            fireEvent.click(button);
        });

        // Then
        waitFor(() => {
            expect(component.baseElement).toMatchSnapshot();
            expect(updateUserFavMovies).toHaveBeenCalledWith(1, 'b88f9510-d302-47d5-9d6b-8b13740f541d');
        });
    });
});

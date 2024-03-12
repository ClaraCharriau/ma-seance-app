import { fireEvent, render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import mockFavoriteMovies from '../../mocks/users/fav-movies.json';
import mockUser from '../../mocks/users/users.json';
import { act } from 'react-dom/test-utils';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import WatchList from './WatchList';

describe('Favorite theaters Component', () => {
    const favoriteContext = require('../../context/favorite.context');
    const authContext = require('../../context/auth.context');
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
    });
    afterEach(() => {
        axiosMock.reset();
    });
    it('should render watchlist page', () => {
        // Given
        jest.spyOn(favoriteContext, 'useFavoriteContext').mockReturnValue({
            favoriteMovies: mockFavoriteMovies.records
        });

        // When
        const component = render(
            <BrowserRouter>
                <WatchList />
            </BrowserRouter>
        );

        // Then
        expect(component.container).toMatchSnapshot();
    });

    it('should render favorite movies component when there are no favorite movies', () => {
        // Given
        jest.spyOn(favoriteContext, 'useFavoriteContext').mockReturnValue({
            favoriteMovies: []
        });

        // When
        const component = render(
            <BrowserRouter>
                <WatchList />
            </BrowserRouter>
        );

        // Then
        expect(component.container).toMatchSnapshot();
    });

    it('should render favorite theaters delete buttons when user click on update button', () => {
        // Given
        jest.spyOn(favoriteContext, 'useFavoriteContext').mockReturnValue({
            favoriteMovies: mockFavoriteMovies.records
        });
        const component = render(
            <BrowserRouter>
                <WatchList />
            </BrowserRouter>
        );

        // When
        fireEvent.click(component.getByText('modifier'));

        // Then
        waitFor(() => {
            expect(component.container).toMatchSnapshot();
        });
    });

    it('should render confirmation modale when clicking on delete button', async () => {
        // Given
        jest.spyOn(favoriteContext, 'useFavoriteContext').mockReturnValue({
            favoriteMovies: mockFavoriteMovies.records
        });
        const component = render(
            <BrowserRouter>
                <WatchList />
            </BrowserRouter>
        );
        await act(() => {
            fireEvent.click(component.getByText('modifier'));
        });

        // When
        await act(() => {
            fireEvent.click(component.getAllByTestId('delete-button')[0]);
        });

        // Then
        await waitFor(() => {
            expect(
                component.getByText(
                    'Êtes-vous bien sûr de vouloir supprimer le film Pauvres créatures de votre watchlist ?'
                )
            ).toBeTruthy();
            expect(component.container).toMatchSnapshot();
        });
    });

    it('should call delete movies when user confirm deleting', async () => {
        // Given
        jest.spyOn(favoriteContext, 'useFavoriteContext').mockReturnValue({
            favoriteMovies: mockFavoriteMovies.records
        });
        jest.spyOn(authContext, 'useAuthContext').mockReturnValue({
            currentUser: mockUser
        });
        axiosMock.onDelete('http://localhost:7878/users/1/fav-movies/3d8f1342-15f1-44b1-a48f-4581d654b94a').reply(200);
        const axiosDelete = jest.spyOn(require('axios'), 'delete');
        const component = render(
            <BrowserRouter>
                <WatchList />
            </BrowserRouter>
        );
        await act(() => {
            fireEvent.click(component.getByText('modifier'));
        });
        await act(() => {
            fireEvent.click(component.getAllByTestId('delete-button')[0]);
        });

        // When
        await act(() => {
            fireEvent.click(component.getByText('confirmer'));
        });

        // Then
        await waitFor(() => {
            expect(axiosDelete).toHaveBeenCalledWith('http://localhost:7878/users/1/fav-movies/3d8f1342-15f1-44b1-a48f-4581d654b94a');
        });
        expect(component.container).toMatchSnapshot();
    });

    it('should close modal', async () => {
        // Given
        jest.spyOn(favoriteContext, 'useFavoriteContext').mockReturnValue({
            favoriteMovies: mockFavoriteMovies.records
        });
        const component = render(
            <BrowserRouter>
                <WatchList />
            </BrowserRouter>
        );
        await act(() => {
            fireEvent.click(component.getByText('modifier'));
        });
        await act(() => {
            fireEvent.click(component.getAllByTestId('delete-button')[0]);
        });

        // When
        await act(() => {
            fireEvent.click(component.getByText('annuler'));
        });

        // Then
        await waitFor(() => {
            expect(component.getByText("Argylle")).toBeInTheDocument();
            expect(component.container).toMatchSnapshot();
        });
    });
});

import { act, fireEvent, render, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import { axiosInstance } from '../../client/axios.config';
import mockFavoriteTheaters from '../../mock/users/fav-theaters.json';
import mockUser from '../../mock/users/users.json';
import FavTheaters from './FavTheaterPage';

describe('Favorite theaters Component', () => {
    const favoriteContext = require('../../context/favorite.context');
    const authContext = require('../../context/auth.context');
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axiosInstance);
    });
    afterEach(() => {
        axiosMock.reset();
    });
    it('should render favorite theaters component', () => {
        // Given
        jest.spyOn(favoriteContext, 'useFavoriteContext').mockReturnValue({
            favoriteTheaters: mockFavoriteTheaters
        });

        // When
        const component = render(
            <BrowserRouter>
                <FavTheaters />
            </BrowserRouter>
        );

        // Then
        expect(component.container).toMatchSnapshot();
    });

    it('should render favorite theaters component when there are no favorite theaters', () => {
        // Given
        jest.spyOn(favoriteContext, 'useFavoriteContext').mockReturnValue({
            favoriteTheaters: []
        });

        // When
        const component = render(
            <BrowserRouter>
                <FavTheaters />
            </BrowserRouter>
        );

        // Then
        expect(component.container).toMatchSnapshot();
    });

    it('should render favorite theaters delete buttons when user click on update button', () => {
        // Given
        jest.spyOn(favoriteContext, 'useFavoriteContext').mockReturnValue({
            favoriteTheaters: mockFavoriteTheaters
        });
        const component = render(
            <BrowserRouter>
                <FavTheaters />
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
            favoriteTheaters: mockFavoriteTheaters
        });
        const component = render(
            <BrowserRouter>
                <FavTheaters />
            </BrowserRouter>
        );
        act(() => {
            fireEvent.click(component.getByText('modifier'));
        });

        // When
        act(() => {
            fireEvent.click(component.getAllByTestId('delete-button')[0]);
        });

        // Then
        await waitFor(() => {
            expect(
                component.getByText(
                    'Êtes-vous bien sûr de vouloir supprimer le cinéma C2L Saint-Germain de vos favoris ?'
                )
            ).toBeTruthy();
            expect(component.container).toMatchSnapshot();
        });
    });

    it('should call delete when user confirm deleting', async () => {
        // Given
        jest.spyOn(favoriteContext, 'useFavoriteContext').mockReturnValue({
            favoriteTheaters: mockFavoriteTheaters
        });
        jest.spyOn(authContext, 'useAuthContext').mockReturnValue({
            currentUser: mockUser
        });
        axiosMock.onDelete('/users/1/fav-theaters/1').reply(200);
        const axiosDelete = jest.spyOn(axiosInstance, 'delete');
        const component = render(
            <BrowserRouter>
                <FavTheaters />
            </BrowserRouter>
        );
        act(() => {
            fireEvent.click(component.getByText('modifier'));
        });
        act(() => {
            fireEvent.click(component.getAllByTestId('delete-button')[0]);
        });

        // When
        act(() => {
            fireEvent.click(component.getByText('confirmer'));
        });

        // Then
        await waitFor(() => {
            expect(component.container).toMatchSnapshot();
            expect(axiosDelete).toHaveBeenCalledWith('http://localhost:7878/users/1/fav-theaters/1');
        });
    });

    it('should close modal', async () => {
        // Given
        jest.spyOn(favoriteContext, 'useFavoriteContext').mockReturnValue({
            favoriteTheaters: mockFavoriteTheaters
        });
        const component = render(
            <BrowserRouter>
                <FavTheaters />
            </BrowserRouter>
        );
        act(() => {
            fireEvent.click(component.getByText('modifier'));
        });
        act(() => {
            fireEvent.click(component.getAllByTestId('delete-button')[0]);
        });

        // When
        act(() => {
            fireEvent.click(component.getByText('annuler'));
        });

        // Then
        await waitFor(() => {
            expect(component.getByText("C2L Poissy")).toBeInTheDocument();
            expect(component.container).toMatchSnapshot();
        });
    });
});

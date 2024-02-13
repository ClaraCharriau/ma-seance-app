import { fireEvent, render } from '@testing-library/react';
import FavoriteButton from './FavoriteButton';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { Theater } from '../../../models/Theater';

describe('Favorite button component tests', () => {
    let axiosMock: MockAdapter;
    const mockFavoriteList: Theater[] = [
        {
            id: 1,
            name: 'C2L Saint-Germain',
            address: '25-27-29, rue du Vieux-Marche 78100 Saint-Germain-en-Laye',
            imgPath: '/c2l-saint-germain'
        },
        {
            id: 2,
            name: 'C2L Poissy',
            address: '112 Rue du Général de Gaulle 78300 Poissy',
            imgPath: '/c2l-poissy'
        }
    ];

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
    });
    afterEach(() => {
        axiosMock.reset();
    });

    it('should render favorite button with theater and filled heart', () => {
        // Given
        axiosMock.onGet('http://localhost:7878/users/1/fav-theaters').reply(200, mockFavoriteList);

        // When
        const component = render(<FavoriteButton itemId={1} itemType={'theater'} />);

        // Then
        expect(component.baseElement).toMatchSnapshot();
    });

    it('should render favorite button with movie', () => {
        // When
        const component = render(<FavoriteButton itemId={1} itemType={'movie'} />);

        // Then
        expect(component.baseElement).toMatchSnapshot();
    });

    it('should render favorite button with theater and empty heart', () => {
        // Given
        axiosMock.onGet('http://localhost:7878/users/1/fav-theaters').reply(200, mockFavoriteList);

        // When
        const component = render(<FavoriteButton itemId={4} itemType={'theater'} />);

        // Then
        expect(component.baseElement).toMatchSnapshot();
    });

    it('should render favorite button with theater and filled heart after clicking button', () => {
        // Given
        axiosMock.onGet('http://localhost:7878/users/1/fav-theaters').reply(200, mockFavoriteList);
        const component = render(<FavoriteButton itemId={4} itemType={'theater'} />);
        const button = component.getByTestId('button');

        // When
        fireEvent.click(button);

        // Then
        expect(component.baseElement).toMatchSnapshot();
    });
});

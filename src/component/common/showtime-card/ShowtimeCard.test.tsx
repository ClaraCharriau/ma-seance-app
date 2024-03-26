import { render } from '@testing-library/react';
import ShowtimeCard from './ShowtimeCard';
import { BrowserRouter } from 'react-router-dom';

describe('Showtime card component tests', () => {
    it('should rend showtime card component', () => {
        // Given
        const showtimeMock = {
            id: 'caadad78-7daf-4c49-abe8-2514b43884f6',
            schedule: {
                date: '2050-02-17T11:45:00',
                dayName: 'jeudi',
                dayNumber: '17',
                month: 'février',
                year: '2050',
                hourly: '11:45'
            },
            movie: {
                id: 'cff01b1b-a943-4bcf-a396-afd80417150a',
                title: 'Dune',
                releaseDate: '2024-01-31',
                duration: 166,
                resume: "Paul Atréides se rallie à Chani et aux Fremen tout en préparant sa revanche contre ceux qui ont détruit sa famille. Alors qu'il doit faire un choix entre l'amour de sa vie et le destin de la galaxie, il devra néanmoins tout faire pour empêcher un terrible futur que lui seul peut prédire.",
                trailerLink: '',
                posterLink: '/qpyaW4xUPeIiYA5ckg5zAZFHvsb.jpg',
                photoLink: '',
                directors: ['Denis Villeneuve'],
                cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'],
                genres: ['Drame', 'Science-Fiction']
            },
            theater: {
                id: '18',
                name: 'UGC Ciné Cité Strasbourg Etoile',
                address: '25, avenue du Rhin 67100 Strasbourg',
                imgPath: '/ugc-etoile-strasbourg',
                bookingPath: ''
            }
        };

        // When
        const component = render(
            <BrowserRouter>
                <ShowtimeCard showtime={showtimeMock} />
            </BrowserRouter>
        );

        // Then
        expect(component.getByText('Dune')).toBeInTheDocument();
        expect(component.container).toMatchSnapshot();
    });
});

import { Movie } from './Movie';
import { Showtime } from './Showtime';

export interface MovieScreenings {
    movie: Movie;
    showtimes: Showtime[];
}

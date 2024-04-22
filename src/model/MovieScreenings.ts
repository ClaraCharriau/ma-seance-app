import { Movie } from './Movie';
import { ScreeningDate } from './ScreeningDate';

export interface MovieScreenings {
    movie: Movie;
    schedule: ScreeningDate[];
}

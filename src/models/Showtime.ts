import { Movie } from './Movie';
import { ScreeningDate } from './ScreeningDate';
import { Theater } from './Theater';

export class Showtime {
    id?: string;
    schedule: ScreeningDate;
    movie: Movie;
    theater: Theater;

    constructor(schedule: ScreeningDate, movie: Movie, theater: Theater) {
        this.schedule = schedule;
        this.movie = movie;
        this.theater = theater;
    }
}

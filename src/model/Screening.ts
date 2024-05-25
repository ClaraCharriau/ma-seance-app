import { Movie } from './Movie';
import { ScreeningDate } from './ScreeningDate';
import { Theater } from './Theater';

export class Screening {
    id?: string;
    schedule: ScreeningDate;
    movie: Movie;
    theater: Theater;

    constructor(id: string, schedule: ScreeningDate, movie: Movie, theater: Theater) {
        this.id = id;
        this.schedule = schedule;
        this.movie = movie;
        this.theater = theater;
    }
}

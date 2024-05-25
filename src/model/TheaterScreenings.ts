import { Showtime } from './Showtime';
import { Theater } from './Theater';

export interface TheaterScreenings {
    theater: Theater;
    showtimes: Showtime[];
}

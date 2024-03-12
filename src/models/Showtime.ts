import { Movie } from "./Movie";
import { ScreeningDate } from "./ScreeningDate";
import { Theater } from "./Theater";

export interface Showtime {
    id: string;
    schedule: ScreeningDate;
    movie: Movie;
    theater: Theater;
}
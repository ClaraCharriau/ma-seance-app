import { ScreeningDate } from './ScreeningDate';
import { Theater } from './Theater';

export interface TheaterScreenings {
    theater: Theater;
    schedule: ScreeningDate[];
}

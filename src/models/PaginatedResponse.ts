import { Movie } from "./Movie";
import { Theater } from "./Theater";

export interface PaginatedMovieResponse {
    _metadata: {
        page: number;
        per_page: number;
        page_count: number;
        total_count: number;
    };
    records: Movie[];
}
import { Movie } from '../../../models/Movie';
import MovieListCard from '../movie-list-card/MovieListCard';
import style from './MovieList.module.css';

interface MovieListProps {
    movieList: Movie[];
}

const MovieList = (props: MovieListProps) => {
    const { movieList } = props;
    return (
        <section className={style.movieList}>
            {movieList.map(movie => (
                <MovieListCard movie={movie} key={movie.id} />
            ))}
        </section>
    );
};

export default MovieList;

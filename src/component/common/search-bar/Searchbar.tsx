import { FormEvent, useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import style from './Searchbar.module.css';

const Searchbar = () => {
    const [searchBarParams, setSearchBarParams] = useSearchParams();
    const [query, setQuery] = useState<string>('');
    const navigate = useNavigate();

    const submitSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        searchInput();
    };

    const searchInput = () => {
        searchBarParams.set('q', query);
        setSearchBarParams(searchBarParams);
        navigate({ pathname: '/search', search: createSearchParams(searchBarParams).toString() }, { state: { query } });
    };

    return (
        <form onSubmit={event => submitSearch(event)} className={style.searchLayout}>
            <button className={style.searchBtn} type="submit">
                <label htmlFor="search">
                    <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14.3009 23.75C19.7895 23.75 24.2388 19.2728 24.2388 13.75C24.2388 8.22715 19.7895 3.75 14.3009 3.75C8.81238 3.75 4.36304 8.22715 4.36304 13.75C4.36304 19.2728 8.81238 23.75 14.3009 23.75Z"
                            stroke="#FAB32D"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M26.7233 26.25L21.3196 20.8125"
                            stroke="#FAB32D"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </label>
            </button>
            <input
                className={style.searchInput}
                type="text"
                name="search"
                id="search"
                placeholder="Rechercher un cinéma, un film..."
                onChange={event => setQuery(event.target.value)}
            />
        </form>
    );
};

export default Searchbar;

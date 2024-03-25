import { useLocation } from 'react-router-dom';

export const SearchPage = () => {
    const { search, state } = useLocation();

    return (
        <main>
            <p>Résultats de la recherche "{state.query ?? search.split('?q=')}"</p>
        </main>
    );
};

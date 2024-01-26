import style from './Searchbar.module.css';

const Searchbar = () => {
    return (
        <div className={style.searchLayout}>
            <button className={style.searchBtn}>
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
            </button>
            <input className={style.searchInput} type="text" placeholder="Rechercher un cinéma, un film..." />
        </div>
    );
};

export default Searchbar;

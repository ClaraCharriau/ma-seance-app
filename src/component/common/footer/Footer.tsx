import { Link } from 'react-router-dom';
import style from './Footer.module.css';

const Footer = () => {
    return (
        <footer>
            <Link className={style.logo} to="/">
                maSéance
            </Link>

            <nav>
                <Link className={style.footerBtn} to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <path
                            d="M8.81449 23.099H6.35745C3.64347 23.099 1.44336 20.8518 1.44336 18.0798V10.1839C1.44336 8.4288 2.34093 6.80115 3.81046 5.89146L9.95308 2.08899C11.5186 1.11992 13.4815 1.11992 15.047 2.08899L21.1896 5.89146C22.6592 6.80115 23.5568 8.4288 23.5568 10.1839V18.0798C23.5568 20.8518 21.3566 23.099 18.6427 23.099H16.1856M8.81449 23.099V18.0798C8.81449 16.0006 10.4645 14.3153 12.5001 14.3153C14.5356 14.3153 16.1856 16.0006 16.1856 18.0798V23.099M8.81449 23.099H16.1856"
                            stroke="#FFF1A7"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    accueil
                </Link>
                <Link className={style.footerBtn} to="/search">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 27 28" fill="none">
                        <path
                            d="M12.375 21.7372C17.3456 21.7372 21.375 17.7077 21.375 12.7372C21.375 7.76662 17.3456 3.73718 12.375 3.73718C7.40444 3.73718 3.375 7.76662 3.375 12.7372C3.375 17.7077 7.40444 21.7372 12.375 21.7372Z"
                            stroke="#FFF1A7"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M23.6252 23.9872L18.7314 19.0934"
                            stroke="#FFF1A7"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    recherche
                </Link>
                <Link className={style.footerBtn} to="/agenda">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.58433 1.36218H19.4155C20.8727 1.36218 22.054 2.57867 22.054 4.07929V20.3819C22.054 21.8825 20.8727 23.099 19.4155 23.099H3.58433C2.12711 23.099 0.945801 21.8825 0.945801 20.3819V4.07929C0.945801 2.57867 2.12711 1.36218 3.58433 1.36218Z"
                            stroke="#FFF1A7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M0.945801 6.79639H22.054"
                            stroke="#FFF1A7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12.3192 12.2306C12.3192 12.7187 11.9387 13.0892 11.4999 13.0892C11.0612 13.0892 10.6807 12.7187 10.6807 12.2306C10.6807 11.7425 11.0612 11.3721 11.4999 11.3721C11.9387 11.3721 12.3192 11.7425 12.3192 12.2306Z"
                            fill="#FFF1A7"
                            stroke="#FFF1A7"
                        />
                        <path
                            d="M7.04234 12.2306C7.04234 12.7187 6.66181 13.0892 6.22307 13.0892C5.78434 13.0892 5.40381 12.7187 5.40381 12.2306C5.40381 11.7425 5.78434 11.3721 6.22307 11.3721C6.66181 11.3721 7.04234 11.7425 7.04234 12.2306Z"
                            fill="#FFF1A7"
                            stroke="#FFF1A7"
                        />
                        <path
                            d="M17.5965 12.2306C17.5965 12.7187 17.216 13.0892 16.7773 13.0892C16.3385 13.0892 15.958 12.7187 15.958 12.2306C15.958 11.7425 16.3385 11.3721 16.7773 11.3721C17.216 11.3721 17.5965 11.7425 17.5965 12.2306Z"
                            fill="#FFF1A7"
                            stroke="#FFF1A7"
                        />
                        <path
                            d="M12.3192 17.6648C12.3192 18.1529 11.9387 18.5234 11.4999 18.5234C11.0612 18.5234 10.6807 18.1529 10.6807 17.6648C10.6807 17.1767 11.0612 16.8063 11.4999 16.8063C11.9387 16.8063 12.3192 17.1767 12.3192 17.6648Z"
                            fill="#FFF1A7"
                            stroke="#FFF1A7"
                        />
                        <path
                            d="M7.04234 17.6648C7.04234 18.1529 6.66181 18.5234 6.22307 18.5234C5.78434 18.5234 5.40381 18.1529 5.40381 17.6648C5.40381 17.1767 5.78434 16.8063 6.22307 16.8063C6.66181 16.8063 7.04234 17.1767 7.04234 17.6648Z"
                            fill="#FFF1A7"
                            stroke="#FFF1A7"
                        />
                        <path
                            d="M17.5965 17.6648C17.5965 18.1529 17.216 18.5234 16.7773 18.5234C16.3385 18.5234 15.958 18.1529 15.958 17.6648C15.958 17.1767 16.3385 16.8063 16.7773 16.8063C17.216 16.8063 17.5965 17.1767 17.5965 17.6648Z"
                            fill="#FFF1A7"
                            stroke="#FFF1A7"
                        />
                    </svg>
                    agenda
                </Link>
                <Link className={style.footerBtn} to="/watchlist">
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="23" viewBox="0 0 27 23" fill="none">
                        <path
                            d="M24.0298 3.02625L24.0317 3.02837C26.2306 5.53002 26.0706 9.679 23.6085 12.2428L23.6078 12.2436L14.5105 21.7574L14.5088 21.7593C14.3881 21.8867 14.2452 21.9872 14.0889 22.0556C13.9325 22.1241 13.7653 22.1596 13.5967 22.1604C13.428 22.1613 13.2605 22.1275 13.1035 22.0606C12.9465 21.9937 12.8026 21.8947 12.6808 21.7685L12.679 21.7667L3.25325 12.101L3.25278 12.1006C2.64604 11.48 2.16693 10.7369 1.84567 9.91604C1.52439 9.09518 1.36797 8.21452 1.38637 7.32809C1.40477 6.44166 1.59759 5.56894 1.95252 4.76343C2.30744 3.95794 2.81675 3.23713 3.4484 2.64452L3.4484 2.64452L3.45011 2.6429C5.85113 0.368942 9.82841 0.53855 12.2987 3.08262L12.2987 3.08263L12.3018 3.08578L13.1525 3.94644L13.5121 4.31028L13.8676 3.9423L14.9459 2.82642L14.9469 2.82542C15.5485 2.1993 16.2651 1.70642 17.0531 1.37538C17.8408 1.04442 18.6844 0.881765 19.5333 0.89667C20.3819 0.913479 21.2186 1.11059 21.9919 1.47641C22.7653 1.84234 23.4592 2.36952 24.0298 3.02625Z"
                            stroke="#FFF1A7"
                        />
                    </svg>
                    watchlist
                </Link>
                <Link className={style.footerBtn} to="/profile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                        <path
                            d="M12 0.362183C5.38308 0.362183 0 5.74526 0 12.3622C0 18.9787 5.38308 24.3622 12 24.3622C18.6165 24.3622 24 18.9787 24 12.3622C24 5.74526 18.6165 0.362183 12 0.362183ZM12 1.54251C17.9658 1.54251 22.8197 6.39602 22.8197 12.3622C22.8197 14.3428 22.2822 16.1994 21.3494 17.7976C20.6258 14.8334 17.9252 12.4633 14.4523 11.6914C15.2577 10.9993 15.7708 9.97595 15.7708 8.8334C15.7708 6.75445 14.0793 5.06304 12.0004 5.06304C9.92144 5.06304 8.23003 6.75445 8.23003 8.8334C8.23003 9.97595 8.74269 10.9993 9.54807 11.6914C6.07515 12.4633 3.37456 14.8334 2.65141 17.7976C1.71777 16.1994 1.18033 14.3428 1.18033 12.3622C1.18033 6.39602 6.03384 1.54251 12 1.54251ZM9.40997 8.8334C9.40997 7.4052 10.5718 6.24336 12 6.24336C13.4282 6.24336 14.59 7.4052 14.59 8.8334C14.59 10.2616 13.4282 11.4234 12 11.4234C10.5718 11.4234 9.40997 10.2616 9.40997 8.8334ZM12 23.1819C8.64118 23.1819 5.63528 21.6435 3.64918 19.2341C3.75305 15.5648 7.45495 12.6038 12 12.6038C16.545 12.6038 20.247 15.5644 20.3512 19.2341C18.3647 21.6435 15.3588 23.1819 12 23.1819Z"
                            fill="#FFF1A7"
                        />
                    </svg>
                    compte
                </Link>
            </nav>
        </footer>
    );
};

export default Footer;

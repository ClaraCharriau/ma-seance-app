import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/auth.context';
import SeeDetailsBtn from '../common/see-details-btn/SeeDetailsBtn';
import CurrentlyCarousel from './currently-carousel/CurrentlyCarousel';
import FavTheaterCarousel from './fav-theater-carousel/FavTheaterCarousel';
import style from './Home.module.css';

const Home = () => {
    const { currentUser } = useAuthContext();

    return (
        currentUser && (
            <main className={style.homePageMain}>
                <div className={style.leftColumn}>
                    {/* CINEMAS FAVORIS */}
                    <section className={style.homeLeftSection}>
                        <div className={style.sectionTitleWrapper}>
                            <NavLink to="/fav-theaters">
                                <h2 className={style.homeSectionTitle}>
                                    <svg
                                        width="17"
                                        height="15"
                                        viewBox="0 0 17 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15.1555 1.89258L15.1574 1.89472C16.5495 3.50656 16.454 6.19924 14.8837 7.86335L14.883 7.86413L8.88362 14.2492L8.88189 14.251C8.81733 14.3205 8.74178 14.3742 8.66039 14.4104C8.57907 14.4467 8.49274 14.4652 8.40616 14.4656C8.31959 14.4661 8.23309 14.4484 8.15142 14.413C8.06969 14.3776 7.99364 14.3246 7.92842 14.2559L7.92666 14.254L1.70958 7.76598L1.70912 7.7655C1.3246 7.36529 1.02017 6.88516 0.815761 6.35376C0.611341 5.82233 0.511632 5.25173 0.523306 4.67711C0.534979 4.10249 0.657761 3.53717 0.883419 3.01591C1.10906 2.49469 1.43243 2.02931 1.83242 1.64741L1.83242 1.64741L1.83412 1.64578C3.34217 0.19229 5.85404 0.290426 7.42467 1.93654L7.42465 1.93655L7.42773 1.93972L7.9888 2.51744L8.35151 2.89091L8.71008 2.51326L9.42115 1.76436L9.4221 1.76335C9.80347 1.35947 10.2568 1.04246 10.7541 0.829862C11.2512 0.617368 11.7829 0.513162 12.3177 0.522736C12.8518 0.533578 13.3789 0.659877 13.8667 0.894775C14.3547 1.12979 14.7937 1.46891 15.1555 1.89258L15.1555 1.89258Z"
                                            fill="#FFF1A7"
                                            stroke="#FFF1A7"
                                        />
                                    </svg>
                                    Cinémas favoris
                                </h2>
                            </NavLink>
                            <SeeDetailsBtn text="Voir plus >" navigatePath="/fav-theaters" showIcon={false} />
                        </div>
                        <FavTheaterCarousel currentUser={currentUser} />
                    </section>

                    {/* CURRENTLY SHOWING MOVIES */}
                    <section className={style.homeLeftSectionBg}>
                        <div className={style.sectionTitleWrapper}>
                            <NavLink to="/currently">
                                <h2 className={style.homeSectionTitle}>
                                    <svg
                                        width="20"
                                        height="21"
                                        viewBox="0 0 20 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M16.9831 11.3173C11.0122 10.171 10.1965 9.35536 9.05081 3.3844C9.03313 3.29243 8.98395 3.20948 8.91174 3.14984C8.83953 3.09019 8.74879 3.05756 8.65513 3.05756C8.56147 3.05756 8.47073 3.09019 8.39852 3.14984C8.32631 3.20948 8.27714 3.29243 8.25945 3.3844C7.11371 9.35536 6.2981 10.171 0.32684 11.3173C0.234886 11.335 0.151944 11.3841 0.0922899 11.4562C0.0326355 11.5284 0 11.6191 0 11.7127C0 11.8063 0.0326355 11.897 0.0922899 11.9692C0.151944 12.0413 0.234886 12.0904 0.32684 12.108C6.29807 13.2541 7.11371 14.0691 8.25945 20.0407C8.27722 20.1326 8.32643 20.2154 8.39863 20.275C8.47083 20.3346 8.56152 20.3672 8.65513 20.3672C8.74874 20.3672 8.83943 20.3346 8.91163 20.275C8.98383 20.2154 9.03304 20.1326 9.05081 20.0407C10.1965 14.0691 11.0122 13.2541 16.9831 12.108C17.075 12.0904 17.158 12.0413 17.2176 11.9692C17.2773 11.897 17.3099 11.8063 17.3099 11.7127C17.3099 11.6191 17.2773 11.5284 17.2176 11.4562C17.158 11.3841 17.075 11.335 16.9831 11.3173Z"
                                            fill="#FFF1A7"
                                        />
                                        <path
                                            d="M16.5396 6.92097C16.4459 6.92092 16.3552 6.88828 16.283 6.82864C16.2108 6.769 16.1616 6.68608 16.1439 6.59413C15.7403 4.49017 15.5099 4.25975 13.4059 3.85617C13.314 3.83848 13.231 3.7893 13.1714 3.71709C13.1117 3.64488 13.0791 3.55415 13.0791 3.46049C13.0791 3.36684 13.1117 3.2761 13.1714 3.20389C13.231 3.13168 13.314 3.0825 13.4059 3.06481C15.5102 2.66093 15.7403 2.43048 16.1439 0.326849C16.1616 0.234872 16.2107 0.151929 16.283 0.0922792C16.3552 0.0326296 16.4459 0 16.5396 0C16.6332 0 16.724 0.0326296 16.7962 0.0922792C16.8684 0.151929 16.9176 0.234872 16.9352 0.326849C17.3388 2.43048 17.5689 2.66093 19.6732 3.06481C19.7652 3.0825 19.8481 3.13168 19.9078 3.20389C19.9674 3.2761 20 3.36684 20 3.46049C20 3.55415 19.9674 3.64488 19.9078 3.71709C19.8481 3.7893 19.7652 3.83848 19.6732 3.85617C17.5693 4.25972 17.3388 4.49017 16.9352 6.59413C16.9175 6.68608 16.8683 6.769 16.7961 6.82864C16.7239 6.88828 16.6332 6.92092 16.5396 6.92097ZM15.0824 3.46049C15.4225 3.57201 15.7317 3.76198 15.9848 4.01506C16.2379 4.26814 16.428 4.57722 16.5396 4.91732C16.6512 4.57722 16.8412 4.26814 17.0943 4.01506C17.3475 3.76198 17.6566 3.57201 17.9967 3.46049C17.6567 3.34887 17.3476 3.15886 17.0945 2.90579C16.8413 2.65273 16.6513 2.3437 16.5396 2.00365C16.4279 2.3437 16.2378 2.65273 15.9847 2.90579C15.7315 3.15885 15.4225 3.34887 15.0824 3.46049Z"
                                            fill="#FFF1A7"
                                        />
                                    </svg>
                                    Sorties de la semaine
                                </h2>
                            </NavLink>
                            <SeeDetailsBtn text="Voir plus >" navigatePath="/currently" showIcon={false} />
                        </div>
                        <CurrentlyCarousel />
                    </section>
                </div>
                <div className={style.rightColumn}>
                    <p>Hello {currentUser.pseudo} !!</p>
                </div>
            </main>
        )
    );
};

export default Home;

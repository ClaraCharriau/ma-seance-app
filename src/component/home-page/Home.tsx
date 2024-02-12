import { useAuthContext } from '../../context/auth.context';
import SeeDetailsBtn from '../common/see-details-btn/SeeDetailsBtn';
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
                            <SeeDetailsBtn text="Voir plus" navigatePath="/fav-theaters" showIcon={false} />
                        </div>
                        <FavTheaterCarousel currentUser={currentUser} />
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

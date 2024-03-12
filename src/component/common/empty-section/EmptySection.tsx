import { redirect } from 'react-router-dom';
import style from './EmptySection.module.css';

interface EmptySectionProps {
    itemType: 'theater' | 'movie';
}

const EmptySection = (props: EmptySectionProps) => {
    const { itemType } = props;

    return (
        <div className={style.emptySection}>
            {itemType === 'movie' ? (
                <p>Vous n'avez pas encore de films dans votre watchlist</p>
            ) : (
                <p>Vous n'avez pas encore de cinémas favoris</p>
            )}
            <button onClick={() => redirect('/search')} className={style.button}>
                Rechercher un {itemType === 'movie' ? 'film' : 'cinéma'}
            </button>
        </div>
    );
};

export default EmptySection;

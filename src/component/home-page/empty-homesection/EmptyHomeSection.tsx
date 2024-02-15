import { redirect } from 'react-router-dom';
import style from './EmptyHomeSection.module.css';

interface EmptyHomeSectionProps {
    itemType: 'theater' | 'movie';
}

const EmptyHomeSection = (props: EmptyHomeSectionProps) => {
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

export default EmptyHomeSection;

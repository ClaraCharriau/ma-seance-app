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
        </div>
    );
};

export default EmptySection;

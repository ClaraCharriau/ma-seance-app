import { ErrorResponse, Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import style from './Error.module.css';

interface ErrorPageProps {
    error?: ErrorResponse | unknown;
}

const ErrorPage = (props: ErrorPageProps) => {
    let { error } = props;
    const routeError = useRouteError();

    if (!error) {
        error = routeError;
    }

    return (
        <main className={style.mainError}>
            {isRouteErrorResponse(error) ? (
                <>
                    <h1>{error.statusText}</h1>
                    <p>Une erreur {error.status} est survenue</p>
                </>
            ) : (
                <p>Oups ! Une erreur s'est produite</p>
            )}
            <Link to="/" className={style.backButton}>
                Retourner à l'accueil
            </Link>
        </main>
    );
};

export default ErrorPage;

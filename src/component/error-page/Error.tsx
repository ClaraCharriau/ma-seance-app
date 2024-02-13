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

    if (isRouteErrorResponse(error)) {
        return (
            <main className={style.mainError}>
                <h1>{error.statusText}</h1>
                <p>Une erreur {error.status} est survenue</p>
                <Link to="/" className={style.backButton}>
                    Retourner à l'accueil
                </Link>
            </main>
        );
    } else {
        return <p>Oups ! Une erreur s'est produite</p>;
    }
};

export default ErrorPage;

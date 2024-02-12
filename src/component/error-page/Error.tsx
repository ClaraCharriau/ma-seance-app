import { ErrorResponse, isRouteErrorResponse, useRouteError } from 'react-router-dom';

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
            <main>
                <h1>{error.statusText}</h1>
                <p>Une erreur {error.status} est survenue</p>
            </main>
        );
    } else {
        return <p>Oups ! Une erreur s'est produite</p>;
    }
};

export default ErrorPage;

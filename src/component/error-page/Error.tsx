import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>Une erreur {error.status} est survenue</h1>
                <p>
                    {error.statusText} - {error.data}
                </p>
            </div>
        );
    } else {
        return <p>Oups ! Une erreur s'est produite</p>;
    }
};

export default ErrorPage;

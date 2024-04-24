import { redirect } from 'react-router-dom';
import { User } from '../../model/User';
import { jwtDecode } from 'jwt-decode';

/**
 * Loader that check if a user token exists and is valid before the page renders.
 * Redirect to login page if the user is not logged.
 */
export const appLoader = () => {
    const maSeanceId = localStorage.getItem('maSeanceId');
    const parsedToken = maSeanceId ? JSON.parse(maSeanceId) : null;

    if (parsedToken) {
        const validToken: { user: User } = jwtDecode(parsedToken.access_token);

        if (!validToken.user) {
            return redirect('/login');
        }
    }
    return null;
};

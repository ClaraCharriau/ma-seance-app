import { jwtDecode } from 'jwt-decode';
import { redirect } from 'react-router-dom';
import { User } from '../../model/User';

/**
 * Loader that check if a user token exists and is valid before the page renders.
 * Redirect to login page if the user is not logged.
 */
export const appLoader = () => {
    const maSeanceId = localStorage.getItem('maSeanceId');
    if (!maSeanceId) {
        return redirect('/login');
    }

    const parsedToken = parseToken(maSeanceId);
    if (!validateParsedToken(parsedToken)) {
        return redirect('/login');
    }

    const decodedToken = decodeToken(parsedToken.access_token);
    if (!validateUser(decodedToken)) {
        return redirect('/login');
    }

    return null;
};

const parseToken = (token: string) => {
    try {
        return JSON.parse(token);
    } catch (error: any) {
        console.error('Error parsing token:', error);
        return null;
    }
};

const decodeToken = (token: string) => {
    try {
        return jwtDecode<{ user: User }>(token);
    } catch (error: any) {
        console.error('Error decoding token:', error);
        return null;
    }
};

const validateUser = (decodedToken: any) => {
    return decodedToken && decodedToken.user;
};

const validateParsedToken = (parsedToken: any) => {
    return parsedToken && parsedToken.access_token;
};

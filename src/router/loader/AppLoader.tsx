import { redirect } from 'react-router-dom';

/**
 * Loader that check if a logged user exists before the page renders
 * and redirect to login page if the user is not logged
 */
export const appLoader = () => {
    const maSeanceId = localStorage.getItem('maSeanceId');
    if (!maSeanceId) {
        return redirect('/login');
    }
    return null;
};

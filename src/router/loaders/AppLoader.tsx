import { redirect } from 'react-router-dom';

/**
 * Loader that check if a logged user exists before the page renders
 * and redirect to login page if the user is not logged
 */
export const appLoader = async () => {
    const currentUser = localStorage.getItem('user');
    if (!currentUser) {
        return redirect('/login');
    }
    return null;
};

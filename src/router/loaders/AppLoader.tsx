import { redirect } from 'react-router-dom';

export const appLoader = async () => {
    const currentUser = localStorage.getItem('user');
    if (!currentUser) {
        return redirect('/login');
    }
    return null;
};

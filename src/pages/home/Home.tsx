import { redirect } from 'react-router-dom';
import { useAuthContext } from '../../context/auth.context';

export const homeLoader = async () => {
    const currentUser = localStorage.getItem('user');
    if (!currentUser) {
        return redirect('/login');
    }
    return null;
};

const Home = () => {
    const { currentUser } = useAuthContext();

    return (
        <main>
            <h1>Welcome</h1>
            <p>
                You are supposed to be logged to see this page, and I know you are {currentUser && currentUser.pseudo}.
            </p>
        </main>
    );
};

export default Home;

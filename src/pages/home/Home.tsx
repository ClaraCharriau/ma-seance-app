import { useAuthContext } from '../../context/auth.context';

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

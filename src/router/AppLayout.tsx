import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom';
import Header from '../component/common/header/Header';
import Footer from '../component/common/footer/Footer';
import Spinner from '../component/common/spinner/Spinner';

const AppLayout = () => {
    const navigation = useNavigation();

    return (
        <>
            <Header />
            <div className={navigation.state === 'loading' ? 'loading' : ''}>
                {navigation.state === 'loading' ? <Spinner /> : <Outlet />}
            </div>
            <Footer />
            <ScrollRestoration />
        </>
    );
};

export default AppLayout;

import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from '../component/common/header/Header';
import Footer from '../component/common/footer/Footer';

const AppLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <ScrollRestoration />
        </>
    );
};

export default AppLayout;

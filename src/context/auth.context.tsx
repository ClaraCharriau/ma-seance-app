import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../models/User';
import { useLocalStorage } from '../hooks/useLocalStorage';

/* eslint-disable */
interface IAuthContext {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
    clearCurrentUser: () => void;
}

const defaultContext: IAuthContext = {
    currentUser: null,
    setCurrentUser: (user: User | null) => {},
    clearCurrentUser: () => {}
};
/* eslint-enable */

export const AuthContext = createContext<IAuthContext>(defaultContext);

interface AuthProviderProps {
    children: JSX.Element;
}

export const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props;
    const { setItem, removeItem, getItem } = useLocalStorage();
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        const storedUser = getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setCurrentUser = (user: User | null) => {
        setUser(user);
        setItem('user', JSON.stringify(user));
    };

    const clearCurrentUser = () => {
        setUser(null);
        removeItem('user');
    };

    const authContext: IAuthContext = {
        currentUser: user,
        setCurrentUser,
        clearCurrentUser
    };

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { User } from '../models/User';
import { useLocalStorage } from '../hook/local-storage-hook/useLocalStorage';

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

    const setCurrentUser = (user: User | null) => {
        setUser(user);
        setItem('user', JSON.stringify(user));
    };

    const clearCurrentUser = () => {
        setUser(null);
        removeItem('user');
    };

    const authContext: IAuthContext = useMemo(
        () => ({
            currentUser: user,
            setCurrentUser,
            clearCurrentUser
        }),
        // eslint-disable-next-line
        [user]
    );

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

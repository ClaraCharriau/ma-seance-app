import { useLocalStorage } from '../hook/local-storage-hook/useLocalStorage';
import { User } from '../models/User';
import { createContext, useContext, useMemo, useState } from 'react';
import { UserToken } from '../models/UserToken';
import { jwtDecode } from 'jwt-decode';

/* eslint-disable */
interface IAuthContext {
    currentUser: User | null;
    setCurrentUserToken: (userToken: UserToken | null) => void;
    clearCurrentUserToken: () => void;
}

const defaultContext: IAuthContext = {
    currentUser: null,
    setCurrentUserToken: (userToken: UserToken | null) => {},
    clearCurrentUserToken: () => {}
};
/* eslint-enable */

export const AuthContext = createContext<IAuthContext>(defaultContext);

interface AuthProviderProps {
    children: JSX.Element;
}

export const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props;
    const { setItem, removeItem, getItem } = useLocalStorage();

    const [user, setUser] = useState<User | null>(null);
    const [userToken, setUserToken] = useState<UserToken | null>(() => {
        const storedUserToken = getItem('maSeanceId');
        const parsedToken = storedUserToken ? JSON.parse(storedUserToken) : null;

        if (parsedToken) {
            const decodedToken = jwtDecode(parsedToken.access_token) as { user: User };
            setUser(decodedToken.user);
        }
        return parsedToken;
    });

    const setCurrentUserToken = (userToken: UserToken | null) => {
        setUserToken(userToken);
        setItem('maSeanceId', JSON.stringify(userToken));
    };

    const clearCurrentUserToken = () => {
        setUserToken(null);
        removeItem('maSeanceId');
    };

    const authContext: IAuthContext = useMemo(
        () => ({
            userToken,
            currentUser: user,
            setCurrentUserToken,
            clearCurrentUserToken
        }),
        // eslint-disable-next-line
        [user]
    );

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

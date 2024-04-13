import { checkAccountExists, deleteAccount, loginUser, signIn, updateAccount } from '../../client/auth/auth.client';
import { useAuthContext } from '../../context/auth.context';

/**
 * Custom hook that facilitate authentification handling
 */
export const useAuth = () => {
    const { setCurrentUserToken, clearCurrentUserToken: clearCurrentUser } = useAuthContext();

    const logUser = async (email: string, password: string) => {
        const userToken = await loginUser(email, password);
        setCurrentUserToken(userToken);
        return userToken;
    };

    const checkUserExists = async (email: string): Promise<boolean> => {
        const response: { isExistingAccount: boolean } = await checkAccountExists(email);
        if (response.isExistingAccount !== undefined) {
            return response.isExistingAccount;
        }
        throw new Error();
    };

    const createUserAccount = async (pseudo: string, email: string, password: string) => {
        await signIn(pseudo, email, password);
    };

    const updateUserAccount = async (id: string, pseudo: string, email: string, password: string) => {
        await updateAccount(id, pseudo, email, password);
    };

    const deleteUserAccount = async (id: string) => {
        await deleteAccount(id);
    };

    const logout = () => {
        clearCurrentUser();
    };

    return { logUser, checkUserExists, createUserAccount, logout, deleteUserAccount, updateUserAccount };
};

import { checkAccountExists, deleteAccount, loginUser, signIn, updateAccount } from '../../client/auth/auth.client';
import { useAuthContext } from '../../context/auth.context';

/**
 * Custom hook that facilitate authentification handling
 */
export const useAuth = () => {
    const { setCurrentUser, clearCurrentUser } = useAuthContext();

    const logUser = async (email: string, password: string) => {
        const user = await loginUser(email, password);
        setCurrentUser(user);
        return user;
    };

    const checkUserExists = async (email: string): Promise<boolean> => {
        const response: { exists: boolean } = await checkAccountExists(email);
        return response.exists;
    };

    const createUserAccount = async (pseudo: string, email: string, password: string) => {
        await signIn(pseudo, email, password);
    };

    const updateUserAccount = async (pseudo: string, email: string, password: string) => {
        await updateAccount(pseudo, email, password);
    };

    const deleteUserAccount = async (id: string) => {
        await deleteAccount(id);
    };

    const logout = () => {
        clearCurrentUser();
    };

    return { logUser, checkUserExists, createUserAccount, logout, deleteUserAccount, updateUserAccount };
};

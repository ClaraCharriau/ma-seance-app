import { checkAccountExists, deleteAccount, loginUser, signIn, updateAccount } from '../client/auth.client';
import { useAuthContext } from '../context/auth.context';

export const useAuth = () => {
    const { setCurrentUser, clearCurrentUser } = useAuthContext();

    const logUser = async (email: string, password: string) => {
        const user = await loginUser(email, password);
        setCurrentUser(user);
        return user;
    };

    const checkUserExists = async (email: string): Promise<boolean> => {
        return await checkAccountExists(email);
    };

    const createUserAccount = async (pseudo: string, email: string, password: string) => {
        await signIn(pseudo, email, password);
    };

    const updateUserAccount = async (pseudo: string, email: string, password: string) => {
        await updateAccount(pseudo, email, password);
    };

    const deleteUserAccount = async (id: number) => {
        await deleteAccount(id);
    };

    const logout = () => {
        clearCurrentUser();
    };

    return { logUser, checkUserExists, createUserAccount, logout, deleteUserAccount, updateUserAccount };
};

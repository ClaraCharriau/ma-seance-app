import { checkAccountExists, loginUser, signIn } from "../client/auth.client";
import { useAuthContext } from "../context/auth.context";

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

  // create user
  const createUserAccount = async (pseudo: string, email: string, password: string) => {
    await signIn(pseudo, email, password);
  };

  // remove user from auth context
  const logout = () => {
    clearCurrentUser();
  };

  return { logUser, checkUserExists, createUserAccount, logout };
};

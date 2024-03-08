import { renderHook } from '@testing-library/react';
import { useAuth } from './useAuth';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockUser from '../mocks/users/users.json';
import mockVerify from '../mocks/auth/verify-false.json';

describe('useAuth hook tests', () => {
    let axiosMock: MockAdapter;
    const axiosPostSpy = jest.spyOn(axios, 'post');
    const axiosPatchSpy = jest.spyOn(axios, 'patch');
    const axiosDeleteSpy = jest.spyOn(axios, 'delete');

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
    });
    afterEach(() => {
        axiosMock.reset();
        jest.clearAllMocks();
    });

    it('should render useAuth hook', async () => {
        const { result } = renderHook(useAuth);
        expect(result.current).toBeTruthy();
    });

    it('should log user', async () => {
        // Given
        const authContext = require('../context/auth.context');
        const setCurrentUser = jest.fn();
        jest.spyOn(authContext, 'useAuthContext').mockReturnValue({ setCurrentUser });
        const { result } = renderHook(useAuth);
        const email = 'test@mail.com';
        const password = 'password';
        axiosMock.onPost().reply(200, mockUser);

        // When
        const loginPromise = result.current.logUser(email, password);

        // Then
        const user = await loginPromise;
        expect(user).toEqual({
            id: 1,
            pseudo: 'Jane',
            email: 'test@mail.com'
        });
        expect(axiosPostSpy).toHaveBeenCalledWith('http://localhost:7878/auth', {
            email: 'test@mail.com',
            password: 'password'
        });
        expect(setCurrentUser).toHaveBeenCalledWith(mockUser);
    });

    it('should check that user exists', async () => {
        // Given
        const { result } = renderHook(useAuth);
        const email = 'test@mail.com';
        axiosMock.onPost().reply(200, mockVerify);

        // When
        const existsPromise = result.current.checkUserExists(email);

        // Then
        const response = await existsPromise;
        expect(response).toBeFalsy();
        expect(axiosPostSpy).toHaveBeenCalledWith('http://localhost:7878/verify', {
            email: 'test@mail.com'
        });
    });

    it('should create user account', async () => {
        // Given
        const { result } = renderHook(useAuth);
        const pseudo = 'Jane';
        const password = 'password';
        const email = 'test@mail.com';
        axiosMock.onPost().reply(200, mockUser);

        // When
        result.current.createUserAccount(pseudo, email, password);

        // Then
        expect(axiosPostSpy).toHaveBeenCalledWith('http://localhost:7878/sign-in', {
            pseudo: 'Jane',
            email: 'test@mail.com',
            password: 'password'
        });
    });

    it('should log out user', async () => {
        // Given
        const authContext = require('../context/auth.context');
        const clearCurrentUser = jest.fn();
        jest.spyOn(authContext, 'useAuthContext').mockReturnValue({ clearCurrentUser });
        const { result } = renderHook(useAuth);

        // When
        result.current.logout();

        // Then
        expect(clearCurrentUser).toHaveBeenCalled();
    });

    it('should update user', async () => {
        // Given
        const { result } = renderHook(useAuth);
        const pseudo = 'Jane';
        const password = 'password';
        const email = 'test@mail.com';
        axiosMock.onPatch().reply(200, mockUser);

        // When
        result.current.updateUserAccount(pseudo, email, password);

        // Then
        expect(axiosPatchSpy).toHaveBeenCalledWith('http://localhost:7878/sign-in', {
            pseudo: 'Jane',
            email: 'test@mail.com',
            password: 'password'
        });
    });

    it('should delete user', async () => {
        // Given
        const { result } = renderHook(useAuth);
        const id = 1;
        axiosMock.onDelete().reply(200);

        // When
        result.current.deleteUserAccount(id);

        // Then
        expect(axiosDeleteSpy).toHaveBeenCalledWith('http://localhost:7878/sign-out/1');
    });
});
export {};

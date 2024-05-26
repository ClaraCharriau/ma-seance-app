import { renderHook } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../../client/axios.config';
import mockVerify from '../../mock/auth/verify-false.json';
import mockUser from '../../mock/users/users.json';
import { useAuth } from './useAuth';

describe('useAuth hook tests', () => {
    let axiosMock: MockAdapter;
    const axiosPostSpy = jest.spyOn(axiosInstance, 'post');
    const axiosPatchSpy = jest.spyOn(axiosInstance, 'patch');
    const axiosDeleteSpy = jest.spyOn(axiosInstance, 'delete');

    const authContext = require('../../context/auth.context');
    const setCurrentUserToken = jest.fn().mockImplementation();
    const clearCurrentUserToken = jest.fn().mockImplementation();

    beforeEach(() => {
        axiosMock = new MockAdapter(axiosInstance);
        jest.spyOn(authContext, 'useAuthContext').mockReturnValue({ setCurrentUserToken, clearCurrentUserToken });
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
        const { result } = renderHook(useAuth);
        const email = 'test@mail.com';
        const password = 'password';
        axiosMock.onPost().reply(200, mockUser);

        // When
        const loginPromise = result.current.logUser(email, password);

        // Then
        const user = await loginPromise;
        expect(user).toEqual({
            id: '1',
            pseudo: 'Jane',
            email: 'test@mail.com'
        });
        expect(axiosPostSpy).toHaveBeenCalledWith('http://localhost:7878/login', {
            email: 'test@mail.com',
            password: 'password'
        });
        expect(setCurrentUserToken).toHaveBeenCalledWith(mockUser);
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
        expect(axiosPostSpy).toHaveBeenCalledWith('http://localhost:7878/registrations', {
            pseudo: 'Jane',
            email: 'test@mail.com',
            password: 'password'
        });
    });

    it('should log out user', async () => {
        // Given
        const authContext = require('../../context/auth.context');
        const clearCurrentUserToken = jest.fn();
        jest.spyOn(authContext, 'useAuthContext').mockReturnValue({ clearCurrentUserToken });
        const { result } = renderHook(useAuth);

        // When
        result.current.logout();

        // Then
        expect(clearCurrentUserToken).toHaveBeenCalled();
    });

    it('should update user', async () => {
        // Given
        const { result } = renderHook(useAuth);
        const pseudo = 'Jane';
        const password = 'newPassword';
        const email = 'test@mail.com';
        axiosMock.onPatch().reply(200, mockUser);
        axiosMock.onPost().reply(200, mockUser);

        // When
        result.current.updateUserAccount('1', pseudo, email, password);

        // Then
        expect(axiosPatchSpy).toHaveBeenCalledWith('http://localhost:7878/registrations/1', {
            id: '1',
            pseudo: 'Jane',
            email: 'test@mail.com',
            password: 'newPassword'
        });
    });

    it('should delete user', async () => {
        // Given
        const { result } = renderHook(useAuth);
        const id = '1';
        axiosMock.onDelete().reply(200);

        // When
        result.current.deleteUserAccount(id);

        // Then
        expect(axiosDeleteSpy).toHaveBeenCalledWith('http://localhost:7878/registrations/1');
    });
});

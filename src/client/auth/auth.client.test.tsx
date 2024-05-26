/* eslint-disable  @typescript-eslint/no-explicit-any */
import MockAdapter from 'axios-mock-adapter';
import mockUser from '../../mock/users/users.json';
import { axiosInstance } from '../axios.config';
import { checkAccountExists, deleteAccount, loginUser, signIn, updateAccount } from './auth.client';

describe('AuthClient tests', () => {
    let axiosMock: MockAdapter;
    const axiosPost = jest.spyOn(axiosInstance, 'post');
    const axiosDelete = jest.spyOn(axiosInstance, 'delete');
    const axiosPatch = jest.spyOn(axiosInstance, 'patch');

    beforeEach(() => {
        axiosMock = new MockAdapter(axiosInstance);
    });
    afterEach(() => {
        axiosMock.reset();
    });

    it('should authenticate user', async () => {
        // Given
        const email = 'test@mail.com';
        const password = 'password';
        axiosMock.onPost('http://localhost:7878/login').reply(200, mockUser);

        // When
        const response = await loginUser(email, password);

        // Then
        expect(response).toEqual({
            id: '1',
            pseudo: 'Jane',
            email: 'test@mail.com'
        });
        expect(axiosPost).toHaveBeenCalledWith('http://localhost:7878/login', {
            email: 'test@mail.com',
            password: 'password'
        });
    });

    it('should fail to authenticate user', async () => {
        // Given
        const email = 'test@mail.com';
        const password = 'password';
        axiosMock.onPost('http://localhost:7878/login').reply(500);
        let response = {};

        // When
        try {
            response = await loginUser(email, password);
        } catch (error: any) {
            // Then
            expect(error.status).toBe(500);
            expect(response).toEqual({});
        }
        expect(axiosPost).toHaveBeenCalledWith('http://localhost:7878/login', {
            email: 'test@mail.com',
            password: 'password'
        });
    });

    it('should check if an account exists', async () => {
        // Given
        const email = 'test@mail.com';
        axiosMock.onPost('http://localhost:7878/verify').reply(200, {
            isExistingAccount: true
        });

        // When
        await checkAccountExists(email);

        // Then
        expect(axiosPost).toHaveBeenCalledWith('http://localhost:7878/verify', {
            email: 'test@mail.com'
        });
    });

    it('should fail to check account existence', async () => {
        // Given
        const email = 'test@mail.com';
        axiosMock.onPost('http://localhost:7878/verify').reply(500);
        let response = {};

        // When
        try {
            response = await checkAccountExists(email);
        } catch (error: any) {
            // Then
            expect(error.status).toBe(500);
            expect(response).toEqual({});
        }
        expect(axiosPost).toHaveBeenCalledWith('http://localhost:7878/verify', {
            email: 'test@mail.com'
        });
    });

    it('should sign in user', async () => {
        // Given
        const pseudo = 'Jane';
        const email = 'test@mail.com';
        const password = 'password';
        axiosMock.onPost('http://localhost:7878/registrations').reply(200, mockUser);

        // When
        const response = await signIn(pseudo, email, password);

        // Then
        expect(response).toEqual({
            id: '1',
            pseudo: 'Jane',
            email: 'test@mail.com'
        });
        expect(axiosPost).toHaveBeenCalledWith('http://localhost:7878/registrations', {
            pseudo: 'Jane',
            email: 'test@mail.com',
            password: 'password'
        });
    });

    it('should fail to sign in user', async () => {
        // Given
        const pseudo = 'Jane';
        const email = 'test@mail.com';
        const password = 'password';
        axiosMock.onPost('http://localhost:7878/registrations').reply(500);
        let response = {};

        // When
        try {
            response = await signIn(pseudo, email, password);
        } catch (error: any) {
            // Then
            expect(error.status).toBe(500);
            expect(response).toEqual({});
        }
        expect(axiosPost).toHaveBeenCalledWith('http://localhost:7878/registrations', {
            pseudo: 'Jane',
            email: 'test@mail.com',
            password: 'password'
        });
    });

    it('should update user', async () => {
        // Given
        const pseudo = 'Jane';
        const email = 'test@mail.com';
        const password = 'password';
        axiosMock.onPatch('http://localhost:7878/registrations/1').reply(200, mockUser);

        // When
        const response = await updateAccount('1', pseudo, email, password);

        // Then
        expect(response).toEqual({
            id: '1',
            pseudo: 'Jane',
            email: 'test@mail.com'
        });
        expect(axiosPatch).toHaveBeenCalledWith('http://localhost:7878/registrations/1', {
            id: '1',
            pseudo: 'Jane',
            email: 'test@mail.com',
            password: 'password'
        });
    });

    it('should fail to update user', async () => {
        // Given
        const pseudo = 'Jane';
        const email = 'test@mail.com';
        const password = 'password';
        axiosMock.onPatch('http://localhost:7878/registrations/1').reply(500);
        let response = {};

        // When
        try {
            response = await updateAccount('1', pseudo, email, password);
        } catch (error: any) {
            // Then
            expect(error.status).toBe(500);
            expect(response).toEqual({});
        }
        expect(axiosPatch).toHaveBeenCalledWith('http://localhost:7878/registrations/1', {
            id: "1",
            pseudo: 'Jane',
            email: 'test@mail.com',
            password: 'password'
        });
    });

    it('should delete user', async () => {
        // Given
        const id = '1';
        axiosMock.onDelete('http://localhost:7878/registrations/1').reply(200);

        // When
        await deleteAccount(id);

        // Then
        expect(axiosDelete).toHaveBeenCalledWith('http://localhost:7878/registrations/1');
    });

    it('should fail to delete user', async () => {
        // Given
        const id = '1';
        axiosMock.onDelete('http://localhost:7878/registrations/1').reply(500);

        // When
        try {
            await deleteAccount(id);
        } catch (error: any) {
            // Then
            expect(error.status).toBe(500);
        }
        expect(axiosDelete).toHaveBeenCalledWith('http://localhost:7878/registrations/1');
    });
});

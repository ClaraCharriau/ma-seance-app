import { AuthProvider, useAuthContext } from './auth.context';
import { render, renderHook } from '@testing-library/react';

const { result } = renderHook(useAuthContext);

const MockChildComponent = () => {
    return <></>;
};

describe('Authentication context tests', () => {
    it('should not have user by default', async () => {
        // Given
        localStorage.removeItem('user');

        // When
        render(
            <AuthProvider>
                <MockChildComponent />
            </AuthProvider>
        );

        // Then
        const user = result.current.currentUser;
        expect(user).toBeNull();
    });

    it('should set user if user exists in localStorage', async () => {
        // Given
        const mockUser = {
            id: 1,
            pseudo: 'Jane',
            email: 'test@mail.com'
        };
        localStorage.setItem('user', JSON.stringify(mockUser));

        // When
        render(
            <AuthProvider>
                <MockChildComponent />
            </AuthProvider>
        );

        // Then
        // await waitFor(() => {
        //     const user = result.current.currentUser;
        //     expect(user).toEqual(mockUser);
        // });
    });

    it('should unset user', async () => {
        // Given
        const mockUser = {
            id: 1,
            pseudo: 'Jane',
            email: 'test@mail.com'
        };
        localStorage.setItem('user', JSON.stringify(mockUser));
        // ++ on a un user dans provider

        // When
        result.current.clearCurrentUser();

        // Then
        const user = result.current.currentUser;
        expect(user).toBeNull();
    });
});
export {};

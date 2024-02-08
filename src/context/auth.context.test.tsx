import { act } from 'react-dom/test-utils';
import { AuthProvider, useAuthContext } from './auth.context';
import { render, renderHook, waitFor } from '@testing-library/react';

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
        const localUser = localStorage.getItem('user');
        expect(localUser).toBeNull();
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
        waitFor(() => {
            const user = result.current.currentUser;
            expect(user).toEqual(mockUser);
            const localUser = localStorage.getItem('user');
            expect(localUser).toEqual(mockUser);
        });
    });

    it('should unset user', async () => {
        // Given
        const mockUser = {
            id: 1,
            pseudo: 'Jane',
            email: 'test@mail.com'
        };
        localStorage.setItem('user', JSON.stringify(mockUser));
        render(
            <AuthProvider>
                <MockChildComponent />
            </AuthProvider>
        );

        // When
        act(() => {
            result.current.clearCurrentUser();
        });

        // Then
        waitFor(() => {
            expect(result.current.currentUser).toBeNull();
            const localUser = localStorage.getItem('user');
            expect(localUser).toBeNull();
        });
    });

    it('should set user', async () => {
        // Given
        const mockUser = {
            id: 1,
            pseudo: 'Jane',
            email: 'test@mail.com'
        };
        localStorage.removeItem('user');
        render(
            <AuthProvider>
                <MockChildComponent />
            </AuthProvider>
        );

        // When
        act(() => {
            result.current.setCurrentUser(mockUser);
        });

        // Then
        waitFor(() => {
            expect(result.current.currentUser).toEqual(mockUser);
            const localUser = localStorage.getItem('user');
            expect(localUser).toEqual(mockUser);
        });
    });
});
export {};

import { act, renderHook } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage hook tests', () => {
    const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
    const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
    const mockRemoveItem = jest.spyOn(Storage.prototype, 'removeItem');

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should set item in localStorage and update state', () => {
        // Given
        const { result } = renderHook(() => useLocalStorage());

        // When
        act(() => {
            result.current.setItem('testKey', 'testValue');
        });

        // Then
        expect(mockSetItem).toHaveBeenCalledWith('testKey', 'testValue');
        expect(result.current.value).toBe('testValue');
    });

    it('should get item from localStorage and update state', () => {
        // Given
        const { result } = renderHook(() => useLocalStorage());

        // When
        act(() => {
            result.current.getItem('testKey');
        });

        // Then
        expect(mockGetItem).toHaveBeenCalledWith('testKey');
        expect(result.current.value).toBe('testValue');
    });

    it('should remove item from localStorage and update state', () => {
        // Given
        const { result } = renderHook(() => useLocalStorage());

        // When
        act(() => {
            result.current.removeItem('testKey');
        });

        // Then
        expect(mockRemoveItem).toHaveBeenCalledWith('testKey');
        expect(result.current.value).toBeNull();
    });
});

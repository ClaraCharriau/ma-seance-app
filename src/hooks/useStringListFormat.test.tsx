import { renderHook } from '@testing-library/react';
import useStringListFormat from './useStringListFormat';

describe('Use string list format hook tests', () => {
    it('should convert list with commas', () => {
        // Given
        const fruits = ['apple', 'berry', 'banana'];

        // When
        const { result } = renderHook(() => useStringListFormat(fruits));

        // Then
        expect(result.current).toBe('apple, berry, banana');
    });

    it('should convert list of two names with &', () => {
        // Given
        const family = ['Dingo', 'Max'];

        // When
        const { result } = renderHook(() => useStringListFormat(family));

        // Then
        expect(result.current).toBe('Dingo & Max');
    });
});

export {};

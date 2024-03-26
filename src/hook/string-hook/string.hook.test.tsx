import { renderHook } from "@testing-library/react";
import { useTextDuration, useTextList } from "./string.hook";

describe('Use text duration hook tests', () => {
    it('should convert 61 minutes to 1h01', () => {
        // Given
        const duration = 61;

        // When
        const { result } = renderHook(() => useTextDuration(duration));

        // Then
        expect(result.current).toBe('1h01');
    });

    it('should convert 20 minutes to 0h20', () => {
        // Given
        const duration = 20;

        // When
        const { result } = renderHook(() => useTextDuration(duration));

        // Then
        expect(result.current).toBe('0h20');
    });
});

describe('Use string list format hook tests', () => {
    it('should convert list with commas', () => {
        // Given
        const fruits = ['apple', 'berry', 'banana'];

        // When
        const { result } = renderHook(() => useTextList(fruits));

        // Then
        expect(result.current).toBe('apple, berry, banana');
    });

    it('should convert list of two names with &', () => {
        // Given
        const family = ['Dingo', 'Max'];

        // When
        const { result } = renderHook(() => useTextList(family));

        // Then
        expect(result.current).toBe('Dingo & Max');
    });
});
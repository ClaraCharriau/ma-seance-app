import { renderHook } from '@testing-library/react';
import useDurationFormat from './useDurationFormat';

describe('Use duration format hook tests', () => {
    it('should convert 61 minutes to 1h01', () => {
        // Given
        const duration = 61;

        // When
        const { result } = renderHook(() => useDurationFormat(duration));

        // Then
        expect(result.current).toBe('1h01');
    });

    it('should convert 20 minutes to 0h20', () => {
        // Given
        const duration = 20;

        // When
        const { result } = renderHook(() => useDurationFormat(duration));

        // Then
        expect(result.current).toBe('0h20');
    });
});

export {};

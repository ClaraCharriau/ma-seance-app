import { renderHook } from '@testing-library/react';
import useDateDMYFormat from './useDateDMYFormat';

describe('Use date format hook tests', () => {
    it('should convert 2024-11-12 to 1h01', () => {
        // Given
        const date = '2024-11-12';

        // When
        const { result } = renderHook(() => useDateDMYFormat(date));

        // Then
        expect(result.current).toBe('12 novembre 2024');
    });
});

export {};

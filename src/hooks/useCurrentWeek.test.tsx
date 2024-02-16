import { renderHook } from '@testing-library/react';
import useCurrentTheaterWeek from './useCurrentWeek';

describe('useCurrentTheaterWeek hook tests', () => {
    it('should convert 2024-11-12 to 1h01', () => {
        // Given
        jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

        // When
        const { result } = renderHook(() => useCurrentTheaterWeek());

        // Then
        expect(result.current).toBe('Semaine du 1 au 14 janvier 2020');
    });
});

export {};

import { renderHook } from '@testing-library/react';
import { useCurrentTheaterWeek, useTextDate, useWeekDays, useYearFromDate } from './date.hook';

describe('Date hooks tests', () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

    test('useCurrentTheaterWeek should give current cinema week', () => {
        // Given When
        const { result } = renderHook(() => useCurrentTheaterWeek());

        // Then
        expect(result.current).toBe('Semaine du 1 au 14 janvier 2020');
    });

    test('useTextDate should convert 2024-11-12 to 12 novembre 2024', () => {
        // Given
        const date = '2024-11-12';

        // When
        const { result } = renderHook(() => useTextDate(date));

        // Then
        expect(result.current).toBe('12 novembre 2024');
    });

    test('useWeekDays should get next 8 days in IDay format', () => {
        // Given When
        const { result } = renderHook(() => useWeekDays());

        // Then
        expect(result.current).toEqual([
            { dayNumber: '01', dayOfWeek: 'mercredi', month: 'janvier' },
            { dayNumber: '02', dayOfWeek: 'jeudi', month: 'janvier' },
            { dayNumber: '03', dayOfWeek: 'vendredi', month: 'janvier' },
            { dayNumber: '04', dayOfWeek: 'samedi', month: 'janvier' },
            { dayNumber: '05', dayOfWeek: 'dimanche', month: 'janvier' },
            { dayNumber: '06', dayOfWeek: 'lundi', month: 'janvier' },
            { dayNumber: '07', dayOfWeek: 'mardi', month: 'janvier' },
            { dayNumber: '08', dayOfWeek: 'mercredi', month: 'janvier' },
            { dayNumber: '09', dayOfWeek: 'jeudi', month: 'janvier' }
        ]);
    });

    test('useYearFromDate should format numeric date to year format', () => {
        // Given
        const date = '2024-11-12';

        // When
        const { result } = renderHook(() => useYearFromDate(date));

        // Then
        expect(result.current).toEqual('2024');
    });
});

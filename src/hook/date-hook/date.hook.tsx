import { addDays, endOfWeek, format, startOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';

export interface IDay {
    dayOfWeek: string;
    dayNumber: string;
    month: string;
}

/**
 * Custom hook that displays the current "cinema week"
 * as new films are released every Wednesday.
 *
 * @returns a sentence to display current cinema week
 */
export const useCurrentTheaterWeek = (): string => {
    const currentDate = new Date();
    const startOfWeekWednesday = startOfWeek(currentDate, { weekStartsOn: 3 });
    const endOfWeekWednesday = endOfWeek(addDays(currentDate, 7), { weekStartsOn: 3 });

    const getWednesday = format(startOfWeekWednesday, 'd', { locale: fr });
    const getNextWednesday = format(endOfWeekWednesday, 'd MMMM yyyy', { locale: fr });

    return `Semaine du ${getWednesday} au ${getNextWednesday}`;
};

/**
 * Custom hook that format a numeric date into a human readable format
 *
 * @param date - string
 * @returns a humain readable date
 */
export const useTextDate = (date: string) => {
    return format(new Date(date), 'd MMMM yyyy', { locale: fr });
};

/**
 * Custom hook that generate an array with the next 8 days in IDay format
 *
 * @returns an array of the next 8 days
 */
export const useWeekDays = (): IDay[] => {
    const today = new Date();
    const weekDays: IDay[] = [];

    for (let i = 0; i <= 8; i++) {
        const nextDay: Date = new Date();
        nextDay.setDate(today.getDate() + i);
        const formattedDate = format(nextDay, 'eeee dd MMMM', { locale: fr });
        const [dayOfWeek, dayNumber, month] = formattedDate.split(' ');
        weekDays.push({ dayOfWeek, dayNumber, month });
    }

    return weekDays;
};

/**
 * Custom hook that format a numeric date into a simple year string
 *
 * @param dateString - 'YYYY-MM-DD' format
 * @returns only the year 'YYYY'
 */
export const useYearFromDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.getFullYear().toString();
};

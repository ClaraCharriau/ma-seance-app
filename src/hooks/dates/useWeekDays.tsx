import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export interface IDay {
    dayOfWeek: string;
    dayNumber: string;
    month: string;
}

const useWeekDays = (): IDay[] => {
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

export default useWeekDays;

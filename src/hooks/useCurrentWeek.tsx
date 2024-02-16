import { format, startOfWeek, endOfWeek, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';

const useCurrentTheaterWeek = (): string => {
    const currentDate = new Date();
    const startOfWeekWednesday = startOfWeek(currentDate, { weekStartsOn: 3 });
    const endOfWeekWednesday = endOfWeek(addDays(currentDate, 7), { weekStartsOn: 3 });

    const getWednesday = format(startOfWeekWednesday, 'd', { locale: fr });
    const getNextWednesday = format(endOfWeekWednesday, 'd MMMM yyyy', { locale: fr });

    return `Semaine du ${getWednesday} au ${getNextWednesday}`;
};

export default useCurrentTheaterWeek;

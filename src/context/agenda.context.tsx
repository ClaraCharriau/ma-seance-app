import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getUserShowtimes, updateUserShowtimes } from '../client/users/user.client';
import { Showtime } from '../models/Showtime';
import { useAuthContext } from './auth.context';

/* eslint-disable */
interface IAgendaContext {
    showtimes: Showtime[] | [];
    updateAgenda: (showtime: Showtime) => Promise<void>
}

const defaultContext: IAgendaContext = {
    showtimes: [],
    updateAgenda: async () => {}
};
/* eslint-enable */

export const AgendaContext = createContext<IAgendaContext>(defaultContext);

interface AgendaProviderProps {
    children: JSX.Element;
}

export const AgendaProvider = (props: AgendaProviderProps) => {
    const { children } = props;
    const { currentUser } = useAuthContext();
    const [showtimes, setShowtimes] = useState<Showtime[]>([]);

    useEffect(() => {
        const getAgenda = async () => {
            if (currentUser) {
                await getUserShowtimes(currentUser.id).then(response => setShowtimes(response));
            }
        };
        getAgenda();
    }, [currentUser]);

    const updateAgenda = async (showtime: Showtime) => {
        if (currentUser) {
            await updateUserShowtimes(currentUser.id, showtime).then(response => setShowtimes(response));
        }
    };

    const agendaContext: IAgendaContext = useMemo(
        () => ({
            showtimes,
            updateAgenda
        }),
        // eslint-disable-next-line
        [showtimes]
    );

    return <AgendaContext.Provider value={agendaContext}>{children}</AgendaContext.Provider>;
};

export const useAgendaContext = () => useContext(AgendaContext);

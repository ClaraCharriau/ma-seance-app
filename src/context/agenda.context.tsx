import { createContext, useContext, useEffect, useState } from 'react';
import { getUserAgenda } from '../client/users/user.client';
import { useAuthContext } from './auth.context';
import { Showtime } from '../models/Showtime';
import { updateUserAgenda } from '../client/users/user.client';

/* eslint-disable */
interface IAgendaContext {
    showtimes: Showtime[] | [];
    updateAgenda: (showtime: Showtime) => Promise<void>;
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
                await getUserAgenda(currentUser.id).then(response => setShowtimes(response));
            }
        };
        getAgenda();
    }, [currentUser]);

    const updateAgenda = async (showtime: Showtime) => {
        if (currentUser) {
            await updateUserAgenda(currentUser.id, showtime).then(response => setShowtimes(response));
        }
    };

    const agendaContext: IAgendaContext = {
        showtimes,
        updateAgenda
    };

    return <AgendaContext.Provider value={agendaContext}>{children}</AgendaContext.Provider>;
};

export const useAgendaContext = () => useContext(AgendaContext);

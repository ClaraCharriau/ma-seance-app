import { createContext, useContext, useEffect, useState } from 'react';
import { getUserAgenda } from '../client/users/user.client';
import { Showtime } from '../models/Screening';
import { useAuthContext } from './auth.context';

/* eslint-disable */
interface IAgendaContext {
    showtimes: Showtime[] | [];
}

const defaultContext: IAgendaContext = {
    showtimes: []
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

    const agendaContext: IAgendaContext = {
        showtimes
    };

    return <AgendaContext.Provider value={agendaContext}>{children}</AgendaContext.Provider>;
};

export const useAgendaContext = () => useContext(AgendaContext);

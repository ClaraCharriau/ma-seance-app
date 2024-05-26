import { createContext, useContext, useEffect, useState } from 'react';
import { getUserScreenings, addToUserScreenings } from '../client/users/user.client';
import { Screening } from '../model/Screening';
import { useAuthContext } from './auth.context';

/* eslint-disable */
interface IAgendaContext {
    screenings: Screening[] | [];
    updateAgenda: (showtime: Screening) => Promise<void>;
    refreshAgenda: () => Promise<void>;
}

const defaultContext: IAgendaContext = {
    screenings: [],
    updateAgenda: async () => {},
    refreshAgenda: async () => {}
};
/* eslint-enable */

export const AgendaContext = createContext<IAgendaContext>(defaultContext);

interface AgendaProviderProps {
    children: JSX.Element;
}

export const AgendaProvider = (props: AgendaProviderProps) => {
    const { children } = props;
    const { currentUser } = useAuthContext();
    const [screenings, setScreenings] = useState<Screening[]>([]);

    useEffect(() => {
        const getAgenda = async () => {
            if (currentUser) {
                await getUserScreenings(currentUser.id).then(response => setScreenings(response));
            }
        };
        getAgenda();
    }, [currentUser]);

    const updateAgenda = async (showtime: Screening) => {
        if (currentUser) {
            await addToUserScreenings(currentUser.id, showtime).then(response => setScreenings(response));
        }
    };

    const refreshAgenda = async () => {
        if (currentUser) {
            await getUserScreenings(currentUser.id).then(response => setScreenings(response));
        }
    };

    const agendaContext: IAgendaContext = {
        screenings: screenings,
        updateAgenda,
        refreshAgenda
    };

    return <AgendaContext.Provider value={agendaContext}>{children}</AgendaContext.Provider>;
};

export const useAgendaContext = () => useContext(AgendaContext);

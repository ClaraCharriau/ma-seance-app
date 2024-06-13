import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { addToUserScreenings, deleteUserScreeningById, getUserScreenings } from '../client/users/user.client';
import { Screening } from '../model/Screening';
import { useAuthContext } from './auth.context';

/* eslint-disable */
interface IAgendaContext {
    screenings: Screening[] | [];
    addToAgenda: (screening: Screening) => void;
    removeFromAgenda: (screeningId: string) => void;
}

const defaultContext: IAgendaContext = {
    screenings: [],
    addToAgenda: () => {},
    removeFromAgenda: () => {}
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
        const getAgenda = () => {
            if (currentUser) {
                getUserScreenings(currentUser.id)
                    .then(response => setScreenings(response))
                    .catch(() => console.error('An error occured'));
            }
        };
        getAgenda();
        // eslint-disable-next-line
    }, [currentUser]);

    const addToAgenda = useCallback((screening: Screening) => {
        if (currentUser) {
            addToUserScreenings(currentUser.id, screening)
                .then(response => setScreenings(response))
                .then(() => refreshAgenda())
                .catch(() => console.error('An error occured'));
        }
        // eslint-disable-next-line
    }, []);

    const removeFromAgenda = useCallback((screeningId: string) => {
        if (currentUser) {
            deleteUserScreeningById(currentUser.id, screeningId)
                .then(() => refreshAgenda())
                .catch(() => console.error('An error occured'));
        }
        // eslint-disable-next-line
    }, []);

    const refreshAgenda = useCallback(() => {
        if (currentUser) {
            getUserScreenings(currentUser.id)
                .then(response => setScreenings(response))
                .catch(() => console.error('An error occured'));
        }
        console.log('refresh agenda', screenings);
        // eslint-disable-next-line
    }, []);

    const agendaContext: IAgendaContext = useMemo(() => {
        return {
            screenings,
            addToAgenda,
            removeFromAgenda
        };
    }, [screenings, addToAgenda, removeFromAgenda]);

    return <AgendaContext.Provider value={agendaContext}>{children}</AgendaContext.Provider>;
};

export const useAgendaContext = () => useContext(AgendaContext);

import { act, fireEvent, render, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../client/axios.config';
import mockUserShowtimes from '../mocks/showtimes/showtimes.json';
import mockUser from '../mocks/users/users.json';
import { AgendaProvider, useAgendaContext } from './agenda.context';

describe('agenda context tests', () => {
    const authContext = require('../context/auth.context');
    jest.spyOn(authContext, 'useAuthContext').mockReturnValue({
        currentUser: mockUser
    });
    let axiosMock: MockAdapter;
    const axiosPatch = jest.spyOn(axiosInstance, 'patch');

    beforeEach(() => {
        axiosMock = new MockAdapter(axiosInstance);
    });
    afterEach(() => {
        axiosMock.reset();
    });

    it('should update agenda', async () => {
         // Given
         axiosMock.onPatch('/users/1/showtimes').reply(200, mockUserShowtimes);
         axiosMock.onGet('/users/1/showtimes').reply(200, mockUserShowtimes);
         const TestComponent = () => {
             const { updateAgenda } = useAgendaContext();
             return <button onClick={() => updateAgenda(mockUserShowtimes)}>test</button>;
         };
         const { getByText } = render(
             <AgendaProvider>
                 <TestComponent />
             </AgendaProvider>
         );
         const button = getByText('test');
 
         // When
         await act(async () => {
             fireEvent.click(button);
             await waitFor(() => expect(axiosPatch).toHaveBeenCalledWith('/users/1/showtimes', mockUserShowtimes));
         });
    });
});

import { act, fireEvent, render, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../client/axios.config';
import mockUserScreenings from '../mock/screenings/screenings.json';
import mockUser from '../mock/users/users.json';
import { AgendaProvider, useAgendaContext } from './agenda.context';

describe('agenda context tests', () => {
    const authContext = require('../context/auth.context');
    jest.spyOn(authContext, 'useAuthContext').mockReturnValue({
        currentUser: mockUser
    });
    let axiosMock: MockAdapter;
    const axiosPost = jest.spyOn(axiosInstance, 'post');

    beforeEach(() => {
        axiosMock = new MockAdapter(axiosInstance);
    });
    afterEach(() => {
        axiosMock.reset();
    });

    it('should update agenda', async () => {
         // Given
         axiosMock.onPost('http://localhost:7878/users/1/screenings/caadad78-7daf-4c49-abe8-2514b43884f6').reply(200, mockUserScreenings);
         axiosMock.onGet('http://localhost:7878/users/1/screenings').reply(200, mockUserScreenings);
         const TestComponent = () => {
             const { addToAgenda } = useAgendaContext();
             return <button onClick={() => addToAgenda(mockUserScreenings)}>test</button>;
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
             await waitFor(() => expect(axiosPost).toHaveBeenCalledWith('http://localhost:7878/users/1/screenings/caadad78-7daf-4c49-abe8-2514b43884f6'));
         });
    });
});

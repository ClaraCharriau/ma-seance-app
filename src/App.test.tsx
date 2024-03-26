import { render, act } from '@testing-library/react';
import App from './App';

it('renders App without crashing', async () => {
    await act(async () => {
        render(<App />);
    });
    expect(true).toBeTruthy();
});

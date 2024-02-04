import { render } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';

it('renders App without crashing', () => {
    act(() => {
        render(<App />);
    });
    expect(true).toBeTruthy();
});

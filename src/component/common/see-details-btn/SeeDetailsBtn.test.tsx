import { fireEvent, render } from '@testing-library/react';
import SeeDetailsBtn from './SeeDetailsBtn';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}));

describe('See Details button Component', () => {
    it('should render see details button component', () => {
        const component = render(
            <BrowserRouter>
                <SeeDetailsBtn text="See details" navigatePath="/fav-theaters" />
            </BrowserRouter>
        );

        expect(component.getByText('See details')).toBeInTheDocument();
        expect(component.baseElement).toMatchSnapshot();
    });

    it('should navigate on click', () => {
        // Given
        const navigate = jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => jest.fn());
        const navigatePath = '/details';
        const text = 'See Details';

        const { getByText } = render(
            <BrowserRouter>
                <SeeDetailsBtn text={text} navigatePath={navigatePath} />
            </BrowserRouter>
        );

        // When
        const button = getByText(text);
        fireEvent.click(button);

        // Then
        expect(navigate).toHaveBeenCalled();
        navigate.mockRestore();
    });
});

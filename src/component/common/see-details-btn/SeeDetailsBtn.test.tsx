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
                <SeeDetailsBtn text="See details" navigatePath="/fav-theaters" showIcon={false} />
            </BrowserRouter>
        );

        expect(component.getByText('See details')).toBeInTheDocument();
        expect(component.baseElement).toMatchSnapshot();
    });
});

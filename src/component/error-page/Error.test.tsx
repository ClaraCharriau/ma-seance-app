import { render } from '@testing-library/react';
import ErrorPage from './Error';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useRouteError: jest.fn(),
    isRouteErrorResponse: jest.fn()
}));

describe('Error page Component', () => {
    it('should render 404 error page', () => {
        const useRouteError = jest
            .spyOn(require('react-router-dom'), 'useRouteError')
            .mockImplementation(() => jest.fn());
        const isRouteErrorResponse = jest
            .spyOn(require('react-router-dom'), 'isRouteErrorResponse')
            .mockImplementation(() => jest.fn());

        const mockError = {
            status: 404,
            statusText: 'Not Found'
        };
        useRouteError.mockReturnValue(mockError);

        const { getByText } = render(<ErrorPage />);

        expect(getByText(`Not Found`)).toBeInTheDocument();
        expect(getByText(`Une erreur 404 est survenue`)).toBeInTheDocument();
        expect(useRouteError).toHaveBeenCalled();
        expect(isRouteErrorResponse).toHaveBeenCalled();
    });

    it('should render 404 error page', () => {
        const useRouteError = jest
            .spyOn(require('react-router-dom'), 'useRouteError')
            .mockImplementation(() => jest.fn());
        const isRouteErrorResponse = jest
            .spyOn(require('react-router-dom'), 'isRouteErrorResponse')
            .mockImplementation(() => {
                return false;
            });

        const { getByText } = render(<ErrorPage />);

        expect(getByText(`Oups ! Une erreur s'est produite`)).toBeInTheDocument();
        expect(useRouteError).toHaveBeenCalled();
        expect(isRouteErrorResponse).toHaveBeenCalled();
    });
});

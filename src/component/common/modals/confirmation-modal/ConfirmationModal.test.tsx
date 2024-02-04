import { render } from '@testing-library/react';
import ConfirmationModal from './ConfirmationModal';

describe('Confirmation modal component tests', () => {
    it('should render confirmation modal', () => {
        // Given
        const textExample: string = 'Souhaitez-vous confirmer la suppression ?';
        const mockLeftBtnCallback = () => {
            console.log('click on left btn');
        };
        const mockRightBtnCallback = () => {
            console.log('click on right btn');
        };

        // When
        const { getByText } = render(
            <ConfirmationModal
                openModal={true}
                confirmationText={textExample}
                leftButtonCallback={mockLeftBtnCallback}
                rightButtonCallback={mockRightBtnCallback}
            />
        );

        // Then
        expect(getByText('Souhaitez-vous confirmer la suppression ?')).toBeInTheDocument();
        expect(getByText('confirmer')).toBeInTheDocument();
        expect(getByText('annuler')).toBeInTheDocument();
    });
});

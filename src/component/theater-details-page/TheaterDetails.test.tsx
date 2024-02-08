import { render } from "@testing-library/react";
import TheaterDetails from "./TheaterDetails";

describe('Theater Details Component', () => {
    it('renders theater details component', () => {
        const component = render(<TheaterDetails />);

        expect(component.container).toMatchSnapshot();
    });
});

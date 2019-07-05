import React from 'react'
import renderer from 'react-test-renderer';
import { Square } from './Square'
import click from './effects/click'
import { ClickCell } from './store/actionCreators';
import { ThemeContext } from './ThemeContext';
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

jest.mock('./effects/click')
configure({ adapter: new Adapter() });

describe('<Square />', () => {
    function prepareComponent(inWinDirection = false) {
        const props = {
            index: 5,
            dispatch: jest.fn(),
            inWinDirection: inWinDirection,
            value: 'X'
        };

        const component = renderer.create(
            <Square
                {...props}
            />
        );

        return {
            props,
            component
        };
    }

    beforeEach(() => {
        click.mockClear();
    });

    it('should render correctly', () => {
        const { component } = prepareComponent();
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should dispatch a ClickCell action when is clicked', () => {
        const props = {
            index: 5,
            dispatch: jest.fn(),
            inWinDirection: false,
            value: 'X'
        };

        const wrapper = shallow(<Square {...props} />);
        wrapper.find('button').simulate('click');

        expect(props.dispatch.mock.calls.length).toBe(1);
        expect(props.dispatch.mock.calls[0][0]).toEqual(ClickCell(props.index));
    });

    it('should apply click effect when is clicked', () => {        
        const props = {
            index: 5,
            dispatch: jest.fn(),
            inWinDirection: false,
            value: 'X'
        };

        const wrapper = shallow(<Square {...props} />);
        wrapper.find('button').simulate('click');
        
        expect(click.mock.calls.length).toBe(1);
    });

    it('should add theme based class', () => {
        const component = renderer.create(
            <ThemeContext.Provider value='test-theme'>
                <Square />
            </ThemeContext.Provider>
        );

        const json = component.toJSON();
        expect(json.props.className).toContain('test-theme-button');
    });

    it('Should add `winCell` when square is in win direction', () => {
        const { component } = prepareComponent(true);

        const json = component.toJSON();
        expect(json.props.className).toContain('winCell');
    });

    it('Should not add `winCell` when square is not in win direction', () => {
        const { component } = prepareComponent(false);

        const json = component.toJSON();
        expect(json.props.className).not.toContain('winCell');
    });

    it('Should have a `square` class', () => {
        const { component } = prepareComponent(false);

        const json = component.toJSON();
        expect(json.props.className).toContain('square');
    });
})
import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { ToggleButton } from './toggle-button';

describe('ToggleButton Component', () => {
  it('should be defined', () => {
    const component = shallow(h(ToggleButton));
    expect(component.length).toEqual(1);
  });
  it('should have active class if active');
  it('should not have active class if not active');
  it('should invoke click event when clicked');
  it('should not throw if click event is not defined when clicked');
});

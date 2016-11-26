import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Button } from './button';

describe('Button Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Button));
    expect(component.length).toEqual(1);
  });
  it('should invoke click event when clicked');
  it('should not throw if click event is undefined when clicked');
  it('should contain text');
});

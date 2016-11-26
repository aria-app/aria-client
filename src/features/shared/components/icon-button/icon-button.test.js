import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { IconButton } from './icon-button';

describe('IconButton Component', () => {
  it('should be defined', () => {
    const component = shallow(h(IconButton, {
      icon: 'pencil',
    }));
    expect(component.length).toEqual(1);
  });
  it('should have active class when active');
  it('should not have active class when not active');
  it('should invoke click event when clicked');
  it('should should not throw if click event is not defined when clicked');
  it('should have title equal to tool tip');
  describe('element __background', () => {
    it('should be defined');
  });
  describe('child component __icon', () => {
    it('should be defined');
    it('should have icon equal to icon');
    it('should have size equal to size');
  });
});

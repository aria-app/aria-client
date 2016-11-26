import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Icon } from './icon';

describe('Icon Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Icon));
    expect(component.length).toEqual(1);
  });
  describe('element __icon__content', () => {
    it('should be defined');
  });
  describe('child component icon', () => {
    it('should be defined when icon is valid');
    it('should not be defined when icon is invalid');
    it('should have size 12 when size is small');
    it('should have size 24 when size is large');
    it('should have size 20 when size is neither small or large');
  });
});

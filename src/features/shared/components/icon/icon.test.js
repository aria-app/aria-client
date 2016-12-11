import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Icon } from './icon';

describe('Icon Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Icon));
    expect(component.length).toEqual(1);
  });

  describe('element __content', () => {
    it('should be defined', () => {
      const component = shallow(h(Icon));
      const iconContentEl = component.find('.icon__content');
      expect(iconContentEl.length).toEqual(1);
    });
  });

  describe('child component icon', () => {
    it('should be defined', () => {
      const component = shallow(h(Icon, {
        icon: 'arrow-down',
      }));
      const iconEl = component.find('.icon__content').childAt(0);
      expect(iconEl.length).toEqual(1);
    });

    it('should have size 12 when size is small', () => {
      const component = shallow(h(Icon, {
        icon: 'arrow-down',
        size: 'small',
      }));
      const iconEl = component.find('.icon__content').childAt(0);
      expect(iconEl.prop('size')).toEqual(12);
    });

    it('should have size 24 when size is large', () => {
      const component = shallow(h(Icon, {
        icon: 'arrow-down',
        size: 'large',
      }));
      const iconEl = component.find('.icon__content').childAt(0);
      expect(iconEl.prop('size')).toEqual(24);
    });

    it('should have size 20 when size is neither small or large', () => {
      const component = shallow(h(Icon, {
        icon: 'arrow-down',
      }));
      const iconEl = component.find('.icon__content').childAt(0);
      expect(iconEl.prop('size')).toEqual(20);
    });
  });
});

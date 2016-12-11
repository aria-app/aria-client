import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { IconButton } from './icon-button';

describe('IconButton Component', () => {
  it('should be defined', () => {
    const component = shallow(h(IconButton, {
      icon: 'pencil',
    }));
    expect(component.length).toEqual(1);
  });

  it('should have active class when active', () => {
    const component = shallow(h(IconButton, {
      icon: 'pencil',
      isActive: true,
    }));
    expect(component.prop('className')).toContain('icon-button--active');
  });

  it('should not have active class when not active', () => {
    const component = shallow(h(IconButton, {
      icon: 'pencil',
      isActive: false,
    }));
    expect(component.prop('className')).not.toContain('icon-button--active');
  });

  it('should invoke click event when clicked', () => {
    const onClick = sinon.spy();
    const component = shallow(h(IconButton, {
      icon: 'pencil',
      onClick,
    }));
    component.simulate('click');
    expect(onClick.called).toEqual(true);
  });

  it('should should not throw if click event is not defined when clicked', () => {
    const component = shallow(h(IconButton, {
      icon: 'pencil',
    }));
    const fn = () => component.simulate('click');
    expect(fn).not.toThrow();
  });

  it('should have title equal to tool tip', () => {
    const toolTip = 'Some Text';
    const component = shallow(h(IconButton, {
      icon: 'pencil',
      toolTip,
    }));
    expect(component.prop('title')).toEqual(toolTip);
  });

  describe('element __background', () => {
    it('should be defined', () => {
      const component = shallow(h(IconButton, {
        icon: 'pencil',
      }));
      const backgroundEl = component.find('.icon-button__background');
      expect(backgroundEl.length).toEqual(1);
    });
  });

  describe('child component __icon', () => {
    it('should be defined', () => {
      const component = shallow(h(IconButton, {
        icon: 'pencil',
      }));
      const iconEl = component.find('.icon-button__icon');
      expect(iconEl.length).toEqual(1);
    });

    it('should have icon equal to icon', () => {
      const icon = 'pencil';
      const component = shallow(h(IconButton, {
        icon,
      }));
      const iconEl = component.find('.icon-button__icon');
      expect(iconEl.prop('icon')).toEqual(icon);
    });

    it('should have size equal to size', () => {
      const size = 'small';
      const component = shallow(h(IconButton, {
        icon: 'pencil',
        size,
      }));
      const iconEl = component.find('.icon-button__icon');
      expect(iconEl.prop('size')).toEqual(size);
    });
  });
});

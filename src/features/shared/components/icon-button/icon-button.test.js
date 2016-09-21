import h from 'react-hyperscript';
import { mount } from 'enzyme';
import { IconButton } from './icon-button';

describe('IconButton Component', () => {
  it('should be defined', () => {
    const component = mount(h(IconButton, {
      icon: 'pencil',
    }));
    expect(component).toBeDefined();
  });

  it('should have active class when active', () => {
    const component = mount(h(IconButton, {
      icon: 'pencil',
      isActive: true,
    }));
    const el = component.find('.icon-button');
    expect(el.hasClass('icon-button--active')).toEqual(true);
  });

  it('should not have active class when not active', () => {
    const component = mount(h(IconButton, {
      icon: 'pencil',
    }));
    const el = component.find('.icon-button');
    expect(el.hasClass('icon-button--active')).toEqual(false);
  });
});

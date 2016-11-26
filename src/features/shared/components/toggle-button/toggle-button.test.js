import h from 'react-hyperscript';
import { mount } from 'enzyme';
import { ToggleButton } from './toggle-button';

describe('ToggleButton Component', () => {
  it('should be defined', () => {
    const component = mount(h(ToggleButton, {
      offset: 0,
    }));
    expect(component).toBeDefined();
  });

  it('should have active class when active', () => {
    const component = mount(h(ToggleButton, {
      isActive: true,
    }));
    const el = component.find('.toggle-button');
    expect(el.hasClass('toggle-button--active')).toEqual(true);
  });

  it('should not have active class when not active', () => {
    const component = mount(h(ToggleButton, {
      isActive: false,
    }));
    const el = component.find('.toggle-button');
    expect(el.hasClass('toggle-button--active')).toEqual(false);
  });

  it('should contain text', () => {
    const text = 'Some Text';
    const component = mount(h(ToggleButton, {
      text,
    }));
    const expected = text;
    const el = component.find('.toggle-button');
    expect(el.text().trim()).toEqual(expected);
  });

  it('should invokePress when pressed', () => {
    let invoked = false;
    const component = mount(h(ToggleButton, {
      onPress: () => {
        invoked = true;
      },
    }));
    component.find('.toggle-button').simulate('click');
    expect(invoked).toEqual(true);
  });
});

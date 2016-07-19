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
    const component = mount(h(ToggleButton));
    expect(false).toEqual(true);
  });

  it('should not have active class when not active', () => {
    const component = mount(h(ToggleButton));
    expect(false).toEqual(true);
  });

  it('should contain text', () => {
    const component = mount(h(ToggleButton));
    expect(false).toEqual(true);
  });

  it('should call onPress when pressed', () => {
    const component = mount(h(ToggleButton));
    expect(false).toEqual(true);
  });
});

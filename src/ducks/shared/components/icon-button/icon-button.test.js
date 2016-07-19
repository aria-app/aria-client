import h from 'react-hyperscript';
import { mount } from 'enzyme';
import { IconButton } from './icon-button';

describe('IconButton Component', () => {
  it('should be defined', () => {
    const component = mount(h(IconButton));
    expect(component).toBeDefined();
  });

  it('should have active class when active', () => {
    const component = mount(h(IconButton));
    expect(false).toEqual(true);
  });

  it('should not have active class when not active', () => {
    const component = mount(h(IconButton));
    expect(false).toEqual(true);
  });
});

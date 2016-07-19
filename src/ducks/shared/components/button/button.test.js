import h from 'react-hyperscript';
import { mount } from 'enzyme';
import { Button } from './button';

describe('Button Component', () => {
  it('should be defined', () => {
    const component = mount(h(Button));
    expect(component).toBeDefined();
  });

  it('should contain text', () => {
    const component = mount(h(Button));
    expect(false).toEqual(true);
  });
});

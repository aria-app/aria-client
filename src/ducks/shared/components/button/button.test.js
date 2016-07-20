import h from 'react-hyperscript';
import { mount } from 'enzyme';
import { Button } from './button';

describe('Button Component', () => {
  it('should be defined', () => {
    const component = mount(h(Button));
    expect(component).toBeDefined();
  });

  it('should contain text', () => {
    const text = 'Some Text';
    const component = mount(h(Button, {
      text,
    }));
    const el = component.find('.button');
    expect(el.text()).toEqual(text);
  });
});

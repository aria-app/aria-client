import h from 'react-hyperscript';
import { mount } from 'enzyme';
import { Timeline } from './timeline';

describe('Timeline Component', () => {
  it('should be defined', () => {
    const component = mount(h(Timeline, {
      offset: 0,
    }));
    expect(component).toBeDefined();
  });

  it('should have display block when visible', () => {
    const component = mount(h(Timeline, {
      isVisible: true,
      offset: 0,
    }));
    const expected = 'block';
    const { display } = component.find('.timeline').prop('style');
    expect(display).toEqual(expected);
  });

  it('should have display none when not visible', () => {
    const component = mount(h(Timeline, {
      offset: 0,
    }));
    const expected = 'none';
    const { display } = component.find('.timeline').prop('style');
    expect(display).toEqual(expected);
  });

  it('should have x-translation equal to offset in pixels', () => {
    const component = mount(h(Timeline, {
      offset: 256,
    }));
    const expected = 'translateX(256px)';
    const { transform } = component.find('.timeline').prop('style');
    expect(transform).toEqual(expected);
  });
});

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
    expect(false).toEqual(true);
  });

  it('should have display none when not visible', () => {
    const component = mount(h(Timeline, {
      offset: 0,
    }));
    expect(false).toEqual(true);
  });

  it('should have x-translation equal to offset in pixels', () => {
    const component = mount(h(Timeline, {
      offset: 0,
    }));
    expect(false).toEqual(true);
  });
});

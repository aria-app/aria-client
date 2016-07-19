import h from 'react-hyperscript';
import { mount } from 'enzyme';
import { Toolbar } from './toolbar';

describe('Toolbar Component', () => {
  it('should be defined', () => {
    const component = mount(h(Toolbar));
    expect(component).toBeDefined();
  });

  it('should have alternate class when when alternate', () => {
    const component = mount(h(Toolbar));
    expect(false).toEqual(true);
  });

  it('should have bottom class when when position is bottom', () => {
    const component = mount(h(Toolbar));
    expect(false).toEqual(true);
  });

  it('should have top class when when position is top', () => {
    const component = mount(h(Toolbar));
    expect(false).toEqual(true);
  });

  describe('left', () => {
    it('should contain leftItems when not alternate', () => {
      const component = mount(h(Toolbar));
      expect(false).toEqual(true);
    });

    it('should contain alternateLeftItems when alternate', () => {
      const component = mount(h(Toolbar));
      expect(false).toEqual(true);
    });
  });

  describe('right', () => {
    it('should contain rightItems when not alternate', () => {
      const component = mount(h(Toolbar));
      expect(false).toEqual(true);
    });

    it('should contain alternateRightItems when alternate', () => {
      const component = mount(h(Toolbar));
      expect(false).toEqual(true);
    });
  });
});

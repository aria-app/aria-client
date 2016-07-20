import h from 'react-hyperscript';
import { mount } from 'enzyme';
import { Toolbar } from './toolbar';

describe('Toolbar Component', () => {
  it('should be defined', () => {
    const component = mount(h(Toolbar));
    expect(component).toBeDefined();
  });

  it('should have alternate class when alternate', () => {
    const component = mount(h(Toolbar, {
      isAlternate: true,
    }));
    const el = component.find('.toolbar');
    expect(el.hasClass('toolbar--alternate')).toEqual(true);
  });

  it('should not have alternate class when not alternate', () => {
    const component = mount(h(Toolbar, {
      isAlternate: false,
    }));
    const el = component.find('.toolbar');
    expect(el.hasClass('toolbar--alternate')).toEqual(false);
  });

  it('should have bottom class when when position is bottom', () => {
    const component = mount(h(Toolbar, {
      position: 'bottom',
    }));
    const el = component.find('.toolbar');
    expect(el.hasClass('toolbar--bottom')).toEqual(true);
  });

  it('should have top class when when position is top', () => {
    const component = mount(h(Toolbar, {
      position: 'top',
    }));
    const el = component.find('.toolbar');
    expect(el.hasClass('toolbar--top')).toEqual(true);
  });

  describe('left', () => {
    it('should contain leftItems when not alternate', () => {
      const alternateLeftItems = [h('div.al', 'AL')];
      const alternateRightItems = [h('div.ar', 'AR')];
      const leftItems = [h('div.l', 'L')];
      const rightItems = [h('div.r', 'R')];
      const component = mount(h(Toolbar, {
        alternateLeftItems,
        alternateRightItems,
        leftItems,
        rightItems,
      }));
      const leftEl = component.find('.toolbar__left');
      expect(leftEl.find('.al').length).toEqual(0);
      expect(leftEl.find('.ar').length).toEqual(0);
      expect(leftEl.find('.l').length).toEqual(1);
      expect(leftEl.find('.r').length).toEqual(0);
    });

    it('should contain alternateLeftItems when alternate', () => {
      const alternateLeftItems = [h('div.al', 'AL')];
      const alternateRightItems = [h('div.ar', 'AR')];
      const leftItems = [h('div.l', 'L')];
      const rightItems = [h('div.r', 'R')];
      const component = mount(h(Toolbar, {
        isAlternate: true,
        alternateLeftItems,
        alternateRightItems,
        leftItems,
        rightItems,
      }));
      const leftEl = component.find('.toolbar__left');
      expect(leftEl.find('.al').length).toEqual(1);
      expect(leftEl.find('.ar').length).toEqual(0);
      expect(leftEl.find('.l').length).toEqual(0);
      expect(leftEl.find('.r').length).toEqual(0);
    });
  });

  describe('right', () => {
    it('should contain rightItems when not alternate', () => {
      const alternateLeftItems = [h('div.al', 'AL')];
      const alternateRightItems = [h('div.ar', 'AR')];
      const leftItems = [h('div.l', 'L')];
      const rightItems = [h('div.r', 'R')];
      const component = mount(h(Toolbar, {
        alternateLeftItems,
        alternateRightItems,
        leftItems,
        rightItems,
      }));
      const rightEl = component.find('.toolbar__right');
      expect(rightEl.find('.al').length).toEqual(0);
      expect(rightEl.find('.ar').length).toEqual(0);
      expect(rightEl.find('.l').length).toEqual(0);
      expect(rightEl.find('.r').length).toEqual(1);
    });

    it('should contain alternateRightItems when alternate', () => {
      const alternateLeftItems = [h('div.al', 'AL')];
      const alternateRightItems = [h('div.ar', 'AR')];
      const leftItems = [h('div.l', 'L')];
      const rightItems = [h('div.r', 'R')];
      const component = mount(h(Toolbar, {
        isAlternate: true,
        alternateLeftItems,
        alternateRightItems,
        leftItems,
        rightItems,
      }));
      const rightEl = component.find('.toolbar__right');
      expect(rightEl.find('.al').length).toEqual(0);
      expect(rightEl.find('.ar').length).toEqual(1);
      expect(rightEl.find('.l').length).toEqual(0);
      expect(rightEl.find('.r').length).toEqual(0);
    });
  });
});

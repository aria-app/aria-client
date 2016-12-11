import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Toolbar } from './toolbar';

describe('Toolbar Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Toolbar));
    expect(component.length).toEqual(1);
  });

  it('should have alternate class when alternate', () => {
    const component = shallow(h(Toolbar, {
      isAlternate: true,
    }));
    expect(component.prop('className')).toContain('toolbar--alternate');
  });

  it('should not have alternate class when not alternate', () => {
    const component = shallow(h(Toolbar, {
      isAlternate: false,
    }));
    expect(component.prop('className')).not.toContain('toolbar--alternate');
  });

  it('should have position bottom class when position is bottom', () => {
    const component = shallow(h(Toolbar, {
      position: 'bottom',
    }));
    expect(component.prop('className')).toContain('toolbar--bottom');
  });

  it('should not have position bottom class when position is not bottom', () => {
    const component = shallow(h(Toolbar, {
      position: 'top',
    }));
    expect(component.prop('className')).not.toContain('toolbar--bottom');
  });

  it('should have position top class when position is top', () => {
    const component = shallow(h(Toolbar, {
      position: 'top',
    }));
    expect(component.prop('className')).toContain('toolbar--top');
  });

  it('should not have position top class when position is not top', () => {
    const component = shallow(h(Toolbar, {
      position: 'bottom',
    }));
    expect(component.prop('className')).not.toContain('toolbar--top');
  });

  describe('element __left', () => {
    it('should be defined', () => {
      const component = shallow(h(Toolbar));
      const leftEl = component.find('.toolbar__left');
      expect(leftEl.length).toEqual(1);
    });

    it('should contain left items when not alternate', () => {
      const leftItems = [
        h('div'),
      ];
      const component = shallow(h(Toolbar, {
        isAlternate: false,
        leftItems,
      }));
      const leftEl = component.find('.toolbar__left');
      expect(leftEl.contains(leftItems)).toEqual(true);
    });

    it('should not contain left items when alternate', () => {
      const leftItems = [
        h('div'),
      ];
      const component = shallow(h(Toolbar, {
        isAlternate: true,
        leftItems,
      }));
      const leftEl = component.find('.toolbar__left');
      expect(leftEl.contains(leftItems)).toEqual(false);
    });

    it('should contain alternate left items when alternate', () => {
      const alternateLeftItems = [
        h('div'),
      ];
      const component = shallow(h(Toolbar, {
        isAlternate: true,
        alternateLeftItems,
      }));
      const leftEl = component.find('.toolbar__left');
      expect(leftEl.contains(alternateLeftItems)).toEqual(true);
    });

    it('should not contain alternate left items when not alternate', () => {
      const alternateLeftItems = [
        h('div'),
      ];
      const component = shallow(h(Toolbar, {
        isAlternate: false,
        alternateLeftItems,
      }));
      const leftEl = component.find('.toolbar__left');
      expect(leftEl.contains(alternateLeftItems)).toEqual(false);
    });
  });

  describe('element __right', () => {
    it('should be defined', () => {
      const component = shallow(h(Toolbar));
      const rightEl = component.find('.toolbar__right');
      expect(rightEl.length).toEqual(1);
    });

    it('should contain right items when not alternate', () => {
      const rightItems = [
        h('div'),
      ];
      const component = shallow(h(Toolbar, {
        isAlternate: false,
        rightItems,
      }));
      const rightEl = component.find('.toolbar__right');
      expect(rightEl.contains(rightItems)).toEqual(true);
    });

    it('should not contain right items when alternate', () => {
      const rightItems = [
        h('div'),
      ];
      const component = shallow(h(Toolbar, {
        isAlternate: true,
        rightItems,
      }));
      const rightEl = component.find('.toolbar__right');
      expect(rightEl.contains(rightItems)).toEqual(false);
    });

    it('should contain alternate right items when alternate', () => {
      const alternateRightItems = [
        h('div'),
      ];
      const component = shallow(h(Toolbar, {
        isAlternate: true,
        alternateRightItems,
      }));
      const rightEl = component.find('.toolbar__right');
      expect(rightEl.contains(alternateRightItems)).toEqual(true);
    });

    it('should not contain alternate right items when not alternate', () => {
      const alternateRightItems = [
        h('div'),
      ];
      const component = shallow(h(Toolbar, {
        isAlternate: false,
        alternateRightItems,
      }));
      const rightEl = component.find('.toolbar__right');
      expect(rightEl.contains(alternateRightItems)).toEqual(false);
    });
  });
});

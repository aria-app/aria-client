import _ from 'lodash';
import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { ContextMenu } from './context-menu';

describe('ContextMenu Component', () => {
  it('should be defined', () => {
    const component = shallow(h(ContextMenu, {
      ...getDefaultProps(),
    }));
    expect(component.length).toEqual(1);
  });

  describe('element __overlay', () => {
    it('should be defined when open', () => {
      const isOpen = true;
      const component = shallow(h(ContextMenu, {
        ...getDefaultProps(),
        isOpen,
      }));
      const overlayEl = component.find('.context-menu__overlay');
      expect(overlayEl.length).toEqual(1);
    });

    it('should not be defined when not open', () => {
      const isOpen = false;
      const component = shallow(h(ContextMenu, {
        ...getDefaultProps(),
        isOpen,
      }));
      const overlayEl = component.find('.context-menu__overlay');
      expect(overlayEl.length).toEqual(0);
    });

    it('should invoke is open change event with false when clicked', () => {
      const onIsOpenChange = sinon.spy();
      const component = shallow(h(ContextMenu, {
        ...getDefaultProps(),
        isOpen: true,
        onIsOpenChange,
      }));
      const overlayEl = component.find('.context-menu__overlay');
      overlayEl.simulate('click');
      expect(_.last(onIsOpenChange.args)[0]).toEqual(false);
    });
  });

  describe('element __overlay__popup', () => {
    it('should be defined', () => {
      const isOpen = true;
      const component = shallow(h(ContextMenu, {
        ...getDefaultProps(),
        isOpen,
      }));
      const overlayPopupEl = component.find('.context-menu__overlay__popup');
      expect(overlayPopupEl.length).toEqual(1);
    });

    it('should have correct transform applied', () => {
      const isOpen = true;
      const component = shallow(h(ContextMenu, {
        ...getDefaultProps(),
        items: [
          { id: 'a' },
          { id: 'b' },
        ],
        position: {
          x: 25,
          y: 25,
        },
        windowHeight: 768,
        windowWidth: 768,
        isOpen,
      }));
      const overlayPopupEl = component.find('.context-menu__overlay__popup');
      expect(overlayPopupEl.prop('style').transform).toEqual('translate(25px, 25px)');
    });

    it('should clamp to the bottom of the screen', () => {
      const isOpen = true;
      const component = shallow(h(ContextMenu, {
        ...getDefaultProps(),
        items: [
          { id: 'a' },
          { id: 'b' },
        ],
        position: {
          x: 25,
          y: 700,
        },
        windowHeight: 768,
        windowWidth: 768,
        isOpen,
      }));
      const overlayPopupEl = component.find('.context-menu__overlay__popup');
      expect(overlayPopupEl.prop('style').transform).toEqual('translate(25px, 656px)');
    });

    it('should clamp to the right of the screen', () => {
      const isOpen = true;
      const component = shallow(h(ContextMenu, {
        ...getDefaultProps(),
        items: [
          { id: 'a' },
          { id: 'b' },
        ],
        position: {
          x: 700,
          y: 25,
        },
        windowHeight: 768,
        windowWidth: 768,
        isOpen,
      }));
      const overlayPopupEl = component.find('.context-menu__overlay__popup');
      expect(overlayPopupEl.prop('style').transform).toEqual('translate(566px, 25px)');
    });
  });

  describe('element __overlay__popup__list', () => {
    it('should be defined', () => {
      const isOpen = true;
      const component = shallow(h(ContextMenu, {
        ...getDefaultProps(),
        isOpen,
      }));
      const overlayPopupListEl = component.find('.context-menu__overlay__popup__list');
      expect(overlayPopupListEl.length).toEqual(1);
    });
  });

  describe('element __overlay__popup__list__item', () => {
    it('should be defined once for each item in items', () => {
      const isOpen = true;
      const items = [
        { id: 'a' },
        { id: 'b' },
      ];
      const component = shallow(h(ContextMenu, {
        ...getDefaultProps(),
        isOpen,
        items,
      }));
      const overlayPopupListItemEls = component.find('.context-menu__overlay__popup__list__item');
      expect(overlayPopupListItemEls.length).toEqual(2);
    });

    it('should invoke select event with item when clicked', () => {
      const isOpen = true;
      const items = [
        { id: 'a' },
        { id: 'b' },
      ];
      const onSelect = sinon.spy();
      const component = shallow(h(ContextMenu, {
        ...getDefaultProps(),
        isOpen,
        items,
        onSelect,
      }));
      const overlayPopupListItemEls = component.find('.context-menu__overlay__popup__list__item');
      overlayPopupListItemEls.first().simulate('click', {
        stopPropagation: () => {},
      });
      expect(_.last(onSelect.args)[0]).toEqual(items[0]);
    });
  });

  describe('element __overlay__popup__list__item__icon', () => {
    it('should be defined for each item in items when item has icon', () => {
      const isOpen = true;
      const items = [
        { icon: 'play', id: 'a' },
        { icon: 'play', id: 'b' },
      ];
      const component = shallow(h(ContextMenu, {
        ...getDefaultProps(),
        isOpen,
        items,
      }));
      const overlayPopupListItemIconEls = component.find('.context-menu__overlay__popup__list__item__icon');
      expect(overlayPopupListItemIconEls.length).toEqual(2);
    });

    it('should not be defined when item does not have icon', () => {
      const isOpen = true;
      const items = [
        { id: 'a' },
        { id: 'b' },
      ];
      const component = shallow(h(ContextMenu, {
        ...getDefaultProps(),
        isOpen,
        items,
      }));
      const overlayPopupListItemIconEls = component.find('.context-menu__overlay__popup__list__item__icon');
      expect(overlayPopupListItemIconEls.length).toEqual(0);
    });

    it('should have item icon as icon', () => {
      const isOpen = true;
      const items = [
        { icon: 'play', id: 'a' },
        { icon: 'play', id: 'b' },
      ];
      const component = shallow(h(ContextMenu, {
        ...getDefaultProps(),
        isOpen,
        items,
      }));
      const overlayPopupListItemIconEls = component.find('.context-menu__overlay__popup__list__item__icon');
      expect(overlayPopupListItemIconEls.first().prop('icon')).toEqual(items[0].icon);
    });
  });

  describe('element __overlay__popup__list__item__text', () => {
    it('should be defined for each item in items', () => {
      const isOpen = true;
      const items = [
        { text: 'delete' },
        { text: 'save' },
      ];
      const component = shallow(h(ContextMenu, {
        ...getDefaultProps(),
        isOpen,
        items,
      }));
      const overlayPopupListItemTextEls = component.find('.context-menu__overlay__popup__list__item__text');
      expect(overlayPopupListItemTextEls.length).toEqual(2);
    });

    it('should contain item text', () => {
      const isOpen = true;
      const items = [
        { text: 'delete' },
        { text: 'save' },
      ];
      const component = shallow(h(ContextMenu, {
        ...getDefaultProps(),
        isOpen,
        items,
      }));
      const overlayPopupListItemTextEls = component.find('.context-menu__overlay__popup__list__item__text');
      expect(overlayPopupListItemTextEls.first().text()).toEqual(items[0].text);
    });
  });
});

function getDefaultProps() {
  return {
    isOpen: false,
    items: [],
    onIsOpenChange: () => {},
    onSelect: () => {},
    position: { x: 0, y: 0 },
    windowHeight: 1024,
    windowWidth: 1024,
  };
}

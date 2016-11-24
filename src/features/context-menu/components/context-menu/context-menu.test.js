import h from 'react-hyperscript';
import { mount } from 'enzyme';
import { ContextMenu } from './context-menu';

describe('ContextMenu Component', () => {
  it('should be defined', () => {
    const component = mount(h(ContextMenu, {
      isOpen: false,
      items: [],
      onRequestClose: () => {},
      onSelect: () => {},
      position: { x: 0, y: 0 },
    }));
    expect(component).not.toBe(undefined);
  });

  it('should render a list item for each item passed in', () => {
    const component = mount(h(ContextMenu, {
      isOpen: true,
      items: [
        { text: 'Item 1 Text' },
        { text: 'Item 2 Text' },
        { text: 'Item 3 Text' },
      ],
      onRequestClose: () => {},
      onSelect: () => {},
      position: { x: 0, y: 0 },
    }));

    expect(component.find('.context-menu__popup__item').length).toEqual(3);
  });

  it('should display item text in list item', () => {
    const component = mount(h(ContextMenu, {
      isOpen: true,
      items: [
        { text: 'Item Text' },
      ],
      onRequestClose: () => {},
      onSelect: () => {},
      position: { x: 0, y: 0 },
    }));

    expect(component.find('.context-menu__popup__item').text()).toEqual('Item Text');
  });

  it('onSelect should be be called with item when item is pressed', () => {
    const item = { text: 'Item Text', icon: 'plus' };
    let selectedItem;
    const component = mount(h(ContextMenu, {
      isOpen: true,
      items: [item],
      onRequestClose: () => {},
      onSelect: (i) => { selectedItem = i; },
      position: { x: 0, y: 0 },
    }));

    component.find('.context-menu__popup__item').simulate('click');

    expect(selectedItem).toEqual(item);
  });

  describe('Overlay', () => {
    it('should be defined if isOpen is true', () => {
      const component = mount(h(ContextMenu, {
        isOpen: true,
        items: [],
        onRequestClose: () => {},
        onSelect: () => {},
        position: { x: 0, y: 0 },
      }));
      expect(component.find('.context-menu__overlay').length).toEqual(1);
    });

    it('should not be defined if isOpen is false', () => {
      const component = mount(h(ContextMenu, {
        isOpen: false,
        items: [],
        onRequestClose: () => {},
        onSelect: () => {},
        position: { x: 0, y: 0 },
      }));
      expect(component.find('.context-menu__overlay').length).toEqual(0);
    });
  });
});

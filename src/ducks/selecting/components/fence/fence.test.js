import h from 'react-hyperscript';
import { mount } from 'enzyme';
import { Fence } from './fence';

describe('Fence Component', () => {
  it('should be defined', () => {
    const component = mount(h(Fence, {
      isSelecting: false,
      newPoint: { x: 0, y: 0 },
      startPoint: { x: 0, y: 0 },
    }));
    expect(component).toBeDefined();
  });

  it('should have display "block" when selecting and has moved from start point', () => {
    const component = mount(h(Fence, {
      isSelecting: true,
      newPoint: { x: 0, y: 0 },
      startPoint: { x: 1, y: 1 },
    }));
    const display = component.find('.fence').node.style.display;
    expect(display).toEqual('block');
  });

  it('should have display "none" when still at start point', () => {
    const component = mount(h(Fence, {
      isSelecting: true,
      newPoint: { x: 0, y: 0 },
      startPoint: { x: 0, y: 0 },
    }));
    const display = component.find('.fence').node.style.display;
    expect(display).toEqual('none');
  });

  it('should have display "none" when not selecting', () => {
    const component = mount(h(Fence, {
      isSelecting: false,
      newPoint: { x: 0, y: 0 },
      startPoint: { x: 0, y: 0 },
    }));
    const display = component.find('.fence').node.style.display;
    expect(display).toEqual('none');
  });

  it('should have width of deltaX * 40px', () => {
    const component = mount(h(Fence, {
      isSelecting: true,
      newPoint: { x: 2, y: 0 },
      startPoint: { x: 0, y: 0 },
    }));
    const width = component.find('.fence').node.style.width;
    expect(width).toEqual('120px');
  });

  it('should have height of deltaY * 40px', () => {
    const component = mount(h(Fence, {
      isSelecting: true,
      newPoint: { x: 0, y: 2 },
      startPoint: { x: 0, y: 0 },
    }));
    const height = component.find('.fence').node.style.height;
    expect(height).toEqual('120px');
  });

  it('should be translated to top left corner of selection when growing normally', () => {
    const component = mount(h(Fence, {
      isSelecting: true,
      newPoint: { x: 5, y: 5 },
      startPoint: { x: 3, y: 3 },
    }));
    const transform = component.find('.fence').node.style.transform;
    expect(transform).toEqual('translate(120px, 120px)');
  });

  it('should be translated to top left corner of selection when growing inversely', () => {
    const component = mount(h(Fence, {
      isSelecting: true,
      newPoint: { x: 2, y: 2 },
      startPoint: { x: 3, y: 3 },
    }));
    const transform = component.find('.fence').node.style.transform;
    expect(transform).toEqual('translate(80px, 80px)');
  });


  // it('should render a list item for each item passed in', () => {
  //   const component = mount(h(ContextMenu, {
  //     isOpen: true,
  //     items: [
  //       { text: 'Item 1 Text' },
  //       { text: 'Item 2 Text' },
  //       { text: 'Item 3 Text' },
  //     ],
  //     onRequestClose: () => {},
  //     onSelect: () => {},
  //     position: { x: 0, y: 0 },
  //   }));
  //
  //   expect(component.find('.context-menu__popup__item').length).toEqual(3);
  // });
  //
  // it('should display item text in list item', () => {
  //   const component = mount(h(ContextMenu, {
  //     isOpen: true,
  //     items: [
  //       { text: 'Item Text' },
  //     ],
  //     onRequestClose: () => {},
  //     onSelect: () => {},
  //     position: { x: 0, y: 0 },
  //   }));
  //
  //   expect(component.find('.context-menu__popup__item').text()).toEqual('Item Text');
  // });
  //
  // it('onSelect should be be called with item when item is pressed', () => {
  //   const item = { text: 'Item Text', icon: 'plus' };
  //   let selectedItem;
  //   const component = mount(h(ContextMenu, {
  //     isOpen: true,
  //     items: [item],
  //     onRequestClose: () => {},
  //     onSelect: i => { selectedItem = i; },
  //     position: { x: 0, y: 0 },
  //   }));
  //
  //   component.find('.context-menu__popup__item').simulate('click');
  //
  //   expect(selectedItem).toEqual(item);
  // });
});

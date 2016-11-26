import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { ContextMenu } from './context-menu';

describe('ContextMenu Component', () => {
  it('should be defined', () => {
    const component = shallow(h(ContextMenu, {
      isOpen: false,
      items: [],
      onIsOpenChange: () => {},
      onSelect: () => {},
      position: { x: 0, y: 0 },
      windowHeight: 1024,
      windowWidth: 1024,
    }));
    expect(component.length).toEqual(1);
  });
  describe('element __overlay', () => {
    it('should be defined when open');
    it('should not be defined when not open');
    it('should invoke is open change event with false when clicked');
  });
  describe('element __overlay__popup', () => {
    it('should be defined');
    it('should have correct transform applied');
    it('should clamp to the bottom of the screen');
    it('should clamp to the right of the screen');
  });
  describe('element __overlay__popup__list', () => {
    it('should be defined');
  });
  describe('element __overlay__popup__list__item', () => {
    it('should be defined once for each item in items');
    it('should invoke select event with item when clicked');
  });
  describe('element __overlay__popup__list__item__icon', () => {
    it('should be defined when item has icon');
    it('should not be defined when item does not have icon');
    it('should have item icon as icon');
  });
  describe('element __overlay__popup__list__item__text', () => {
    it('should be defined');
    it('should contain item text');
  });
});

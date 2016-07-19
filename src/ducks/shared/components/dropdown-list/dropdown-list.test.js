import h from 'react-hyperscript';
import { mount } from 'enzyme';
import { DropdownList } from './dropdown-list';

describe('DropdownList Component', () => {
  it('should be defined', () => {
    const component = mount(h(DropdownList, {
      items: [],
    }));
    expect(component).toBeDefined();
  });

  describe('button', () => {
    it('should be defined when icon is defined', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      expect(false).toEqual(true);
    });

    it('should not be defined when icon is not defined', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      expect(false).toEqual(true);
    });

    it('should set isOpen to true when pressed', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      expect(false).toEqual(true);
    });
  });

  describe('input', () => {
    it('should be defined when icon is not defined', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      expect(false).toEqual(true);
    });

    it('should not be defined when icon is defined', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      expect(false).toEqual(true);
    });

    it('should set isOpen to true when pressed', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      expect(false).toEqual(true);
    });

    it('should contain text when text is defined', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      expect(false).toEqual(true);
    });

    it('should contain selectedItem text when text is not defined', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      expect(false).toEqual(true);
    });

    it('should be empty when selectedItem and text are not defined', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      expect(false).toEqual(true);
    });
  });

  describe('overlay', () => {
    it('should be defined when open', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      expect(false).toEqual(true);
    });

    it('should set isOpen to false when pressed', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      expect(false).toEqual(true);
    });
  });

  describe('popup', () => {
    it('should be defined when open', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      expect(false).toEqual(true);
    });

    it('should have height equal to (items.length * 48px) + 16px', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      expect(false).toEqual(true);
    });
  });

  describe('popup item', () => {
    it('should have active class when active', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      expect(false).toEqual(true);
    });

    it('should contain item text', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      expect(false).toEqual(true);
    });

    it('should invoke onSelect with item when pressed', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      expect(false).toEqual(true);
    });
  });
});

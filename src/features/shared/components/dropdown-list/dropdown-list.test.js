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
        icon: 'pencil',
        items: [],
      }));
      const buttonEl = component.find('.dropdown-list__button');
      expect(buttonEl.length).toEqual(1);
    });

    it('should not be defined when icon is not defined', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      const buttonEl = component.find('.dropdown-list__button');
      expect(buttonEl.length).toEqual(0);
    });

    it('should set isOpen to true when pressed', () => {
      const component = mount(h(DropdownList, {
        icon: 'pencil',
        items: [],
      }));
      const buttonEl = component.find('.dropdown-list__button');
      buttonEl.simulate('click');
      const overlayEl = component.find('.dropdown-list__overlay');
      expect(overlayEl.length).toEqual(1);
    });
  });

  describe('input', () => {
    it('should be defined when icon is not defined', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      const inputEl = component.find('.dropdown-list__input');
      expect(inputEl.length).toEqual(1);
    });

    it('should not be defined when icon is defined', () => {
      const component = mount(h(DropdownList, {
        icon: 'pencil',
        items: [],
      }));
      const inputEl = component.find('.dropdown-list__input');
      expect(inputEl.length).toEqual(0);
    });

    it('should set isOpen to true when pressed', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      const inputEl = component.find('.dropdown-list__input');
      inputEl.simulate('click');
      const overlayEl = component.find('.dropdown-list__overlay');
      expect(overlayEl.length).toEqual(1);
    });

    it('should contain text when text is defined', () => {
      const text = 'Some Text';
      const selectedItem = { text: 'Some Item Text' };
      const otherItem = { text: 'Other Item Text' };
      const component = mount(h(DropdownList, {
        text: 'Some Text',
        items: [selectedItem, otherItem],
        selectedItem,
      }));
      const expected = text;
      const inputEl = component.find('.dropdown-list__input');
      expect(inputEl.text().trim()).toEqual(expected);
    });

    it('should contain selectedItem text when text is not defined', () => {
      const selectedItem = { text: 'Some Item Text' };
      const otherItem = { text: 'Other Item Text' };
      const component = mount(h(DropdownList, {
        items: [selectedItem, otherItem],
        selectedItem,
      }));
      const expected = selectedItem.text;
      const inputEl = component.find('.dropdown-list__input');
      expect(inputEl.text().trim()).toEqual(expected);
    });

    it('should be empty when selectedItem and text are not defined', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      const expected = '';
      const inputEl = component.find('.dropdown-list__input');
      expect(inputEl.text().trim()).toEqual(expected);
    });
  });

  describe('overlay', () => {
    it('should be defined when open', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      const inputEl = component.find('.dropdown-list__input');
      inputEl.simulate('click');
      const overlayEl = component.find('.dropdown-list__overlay');
      expect(overlayEl.length).toEqual(1);
    });

    it('should set isOpen to false when pressed', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      const inputEl = component.find('.dropdown-list__input');
      inputEl.simulate('click');
      const overlayEl = component.find('.dropdown-list__overlay');
      overlayEl.simulate('click');
      const overlayWhenClosed = component.find('.dropdown-list__overlay');
      expect(overlayWhenClosed.length).toEqual(0);
    });
  });

  describe('popup', () => {
    it('should be defined when open', () => {
      const component = mount(h(DropdownList, {
        items: [],
      }));
      const inputEl = component.find('.dropdown-list__input');
      inputEl.simulate('click');
      const popupEl = component.find('.dropdown-list__popup');
      expect(popupEl.length).toEqual(1);
    });

    it('should have height equal to (items.length * 48) + 16', () => {
      const component = mount(h(DropdownList, {
        items: [
          { text: '1' },
          { text: '2' },
          { text: '3' },
        ],
      }));
      const expected = 160;
      const inputEl = component.find('.dropdown-list__input');
      inputEl.simulate('click');
      const popupEl = component.find('.dropdown-list__popup');
      const { height } = popupEl.prop('style');
      expect(height).toEqual(expected);
    });
  });

  describe('popup item', () => {
    it('should have active class when active', () => {
      const item = { text: '1' };
      const component = mount(h(DropdownList, {
        items: [
          item,
          { text: '2' },
          { text: '3' },
        ],
        selectedItem: item,
      }));
      const inputEl = component.find('.dropdown-list__input');
      inputEl.simulate('click');
      const popupItemEl = component.find('.dropdown-list__popup__item').first();
      expect(popupItemEl.hasClass('dropdown-list__popup__item--active')).toEqual(true);
    });

    it('should contain item text', () => {
      const item = { text: '1' };
      const component = mount(h(DropdownList, {
        items: [
          item,
          { text: '2' },
          { text: '3' },
        ],
      }));
      const expected = item.text;
      const inputEl = component.find('.dropdown-list__input');
      inputEl.simulate('click');
      const popupItemEl = component.find('.dropdown-list__popup__item').first();
      expect(popupItemEl.text().trim()).toEqual(expected);
    });

    it('should invoke onSelect with item when pressed', () => {
      let result;
      const item = { text: '1' };
      const component = mount(h(DropdownList, {
        items: [
          item,
          { text: '2' },
          { text: '3' },
        ],
        onSelect: (i) => {
          result = i;
        },
      }));
      const expected = item;
      const inputEl = component.find('.dropdown-list__input');
      inputEl.simulate('click');
      const popupItemEl = component.find('.dropdown-list__popup__item').first();
      popupItemEl.simulate('click');
      expect(result).toEqual(expected);
    });
  });
});

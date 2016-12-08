import _ from 'lodash';
import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { DropdownList } from './dropdown-list';

describe('Dropdown List Component', () => {
  it('should be defined', () => {
    const component = shallow(h(DropdownList, {
      items: [],
    }));
    expect(component.length).toEqual(1);
  });

  it('should be closed by default', () => {
    const component = shallow(h(DropdownList, {
      items: [],
    }));
    expect(component.state('isOpen')).toEqual(false);
  });

  describe('child component __button', () => {
    it('should be defined when icon is defined', () => {
      const component = shallow(h(DropdownList, {
        icon: 'pencil',
        items: [],
      }));
      const buttonEl = component.find('.dropdown-list__button');
      expect(buttonEl.length).toEqual(1);
    });

    it('should not be defined when icon is not defined', () => {
      const component = shallow(h(DropdownList, {
        items: [],
      }));
      const buttonEl = component.find('.dropdown-list__button');
      expect(buttonEl.length).toEqual(0);
    });

    it('should have correct click handler', () => {
      const component = shallow(h(DropdownList, {
        icon: 'pencil',
        items: [],
      }));
      const buttonEl = component.find('.dropdown-list__button');
      const { handleButtonClick } = component.instance();
      expect(buttonEl.prop('onClick')).toEqual(handleButtonClick);
    });

    it('should have correct icon value', () => {
      const icon = 'pencil';
      const component = shallow(h(DropdownList, {
        items: [],
        icon,
      }));
      const buttonEl = component.find('.dropdown-list__button');
      expect(buttonEl.prop('icon')).toEqual(icon);
    });
  });

  describe('element __input', () => {
    it('should be defined when icon is not defined', () => {
      const component = shallow(h(DropdownList, {
        items: [],
      }));
      const inputEl = component.find('.dropdown-list__input');
      expect(inputEl.length).toEqual(1);
    });

    it('should not be defined when icon is defined', () => {
      const component = shallow(h(DropdownList, {
        icon: 'pencil',
        items: [],
      }));
      const inputEl = component.find('.dropdown-list__input');
      expect(inputEl.length).toEqual(0);
    });

    it('should set "is open" to true when clicked', () => {
      const component = shallow(h(DropdownList, {
        items: [],
      }));
      const inputEl = component.find('.dropdown-list__input');
      inputEl.simulate('click');
      expect(component.state('isOpen')).toEqual(true);
    });
  });

  describe('element __input__text', () => {
    it('should be defined when icon is not defined', () => {
      const component = shallow(h(DropdownList, {
        items: [],
      }));
      const inputTextEl = component.find('.dropdown-list__input__text');
      expect(inputTextEl.length).toEqual(1);
    });

    it('should not be defined when icon is defined', () => {
      const component = shallow(h(DropdownList, {
        icon: 'pencil',
        items: [],
      }));
      const inputTextEl = component.find('.dropdown-list__input__text');
      expect(inputTextEl.length).toEqual(0);
    });

    it('should contain text when text is defined', () => {
      const text = 'Instruments';
      const component = shallow(h(DropdownList, {
        items: [],
        text,
      }));
      const inputTextEl = component.find('.dropdown-list__input__text');
      expect(inputTextEl.text()).toEqual(text);
    });

    it('should contain selected item text when text is not defined and selected id is defined', () => {
      const text = 'Instruments';
      const items = [{ id: 'a', text }];
      const component = shallow(h(DropdownList, {
        selectedId: 'a',
        items,
      }));
      const inputTextEl = component.find('.dropdown-list__input__text');
      expect(inputTextEl.text()).toEqual(text);
    });

    it('should contain selected item text when text is not defined and selected item is defined', () => {
      const text = 'Instruments';
      const items = [{ text }];
      const component = shallow(h(DropdownList, {
        selectedItem: items[0],
        items,
      }));
      const inputTextEl = component.find('.dropdown-list__input__text');
      expect(inputTextEl.text()).toEqual(text);
    });

    it('should contain empty string when text is not defined, selected id is not defined, and selected item is not defined', () => {
      const component = shallow(h(DropdownList, {
        items: [],
      }));
      const inputTextEl = component.find('.dropdown-list__input__text');
      expect(inputTextEl.text()).toEqual('');
    });
  });

  describe('child component __input__caret', () => {
    it('should be defined when icon is not defined', () => {
      const component = shallow(h(DropdownList, {
        items: [],
      }));
      const inputCaretEl = component.find('.dropdown-list__input__caret');
      expect(inputCaretEl.length).toEqual(1);
    });

    it('should not be defined when icon is defined', () => {
      const component = shallow(h(DropdownList, {
        icon: 'pencil',
        items: [],
      }));
      const inputCaretEl = component.find('.dropdown-list__input__caret');
      expect(inputCaretEl.length).toEqual(0);
    });

    it('should have caret-down icon', () => {
      const component = shallow(h(DropdownList, {
        items: [],
      }));
      const inputCaretEl = component.find('.dropdown-list__input__caret');
      expect(inputCaretEl.prop('icon')).toEqual('caret-down');
    });

    it('should have small size', () => {
      const component = shallow(h(DropdownList, {
        items: [],
      }));
      const inputCaretEl = component.find('.dropdown-list__input__caret');
      expect(inputCaretEl.prop('size')).toEqual('small');
    });
  });

  describe('element __overlay', () => {
    it('should be defined when open', () => {
      const component = shallow(h(DropdownList, {
        items: [],
      }));
      component.setState({ isOpen: true });
      const overlayEl = component.find('.dropdown-list__overlay');
      expect(overlayEl.length).toEqual(1);
    });

    it('should not be defined when not open', () => {
      const component = shallow(h(DropdownList, {
        items: [],
      }));
      const overlayEl = component.find('.dropdown-list__overlay');
      expect(overlayEl.length).toEqual(0);
    });

    it('should set "is open" to false when clicked', () => {
      const component = shallow(h(DropdownList, {
        items: [],
      }));
      component.setState({ isOpen: true });
      const overlayEl = component.find('.dropdown-list__overlay');
      overlayEl.simulate('click');
      expect(component.state('isOpen')).toEqual(false);
    });
  });

  describe('element __popup', () => {
    it('should be defined when open', () => {
      const component = shallow(h(DropdownList, {
        items: [],
      }));
      component.setState({ isOpen: true });
      const popupEl = component.find('.dropdown-list__popup');
      expect(popupEl.length).toEqual(1);
    });

    it('should not be defined when not open', () => {
      const component = shallow(h(DropdownList, {
        items: [],
      }));
      const popupEl = component.find('.dropdown-list__popup');
      expect(popupEl.length).toEqual(0);
    });

    it('should have correct ref function', () => {
      const component = shallow(h(DropdownList, {
        items: [],
      }));
      component.setState({ isOpen: true });
      const popupEl = component.find('.dropdown-list__popup');
      expect(popupEl.node.ref).toEqual(component.instance().setPopupRef);
    });

    it('should have height equal to length of items * item height + vertical padding', () => {
      const component = shallow(h(DropdownList, {
        items: [
          { id: 'a', text: 'Hey' },
          { id: 'b', text: 'Yo' },
          { id: 'c', text: 'Sup' },
        ],
      }));
      component.setState({ isOpen: true });
      const popupEl = component.find('.dropdown-list__popup');
      expect(popupEl.prop('style').height).toEqual((3 * 48) + 16);
    });
  });

  describe('element __popup__list', () => {
    it('should be defined when open', () => {
      const component = shallow(h(DropdownList, {
        items: [],
      }));
      component.setState({ isOpen: true });
      const popupListEl = component.find('.dropdown-list__popup__list');
      expect(popupListEl.length).toEqual(1);
    });

    it('should not be defined when not open', () => {
      const component = shallow(h(DropdownList, {
        items: [],
      }));
      const popupListEl = component.find('.dropdown-list__popup__list');
      expect(popupListEl.length).toEqual(0);
    });
  });

  describe('element __popup__list__item', () => {
    it('should be defined once for each item in items when open', () => {
      const component = shallow(h(DropdownList, {
        items: [
          { id: 'a', text: 'A' },
          { id: 'b', text: 'B' },
          { id: 'c', text: 'C' },
        ],
      }));
      component.setState({ isOpen: true });
      const popupListItemEl = component.find('.dropdown-list__popup__list__item');
      expect(popupListItemEl.length).toEqual(3);
    });

    it('should not be defined when not open', () => {
      const component = shallow(h(DropdownList, {
        items: [
          { id: 'a', text: 'A' },
          { id: 'b', text: 'B' },
          { id: 'c', text: 'C' },
        ],
      }));
      const popupListItemEls = component.find('.dropdown-list__popup__list__item');
      expect(popupListItemEls.length).toEqual(0);
    });

    it('should invoke selected id change event with item when clicked', () => {
      const onSelectedIdChange = sinon.spy();
      const component = shallow(h(DropdownList, {
        items: [
          { id: 'a', text: 'A' },
          { id: 'b', text: 'B' },
          { id: 'c', text: 'C' },
        ],
        onSelectedIdChange,
      }));
      component.setState({ isOpen: true });
      const popupListItemEls = component.find('.dropdown-list__popup__list__item');
      popupListItemEls.first().simulate('click');
      expect(_.last(onSelectedIdChange.args)[0]).toEqual('a');
    });

    it('should not throw when selected id change event is not defined when clicked', () => {
      const component = shallow(h(DropdownList, {
        items: [
          { id: 'a', text: 'A' },
          { id: 'b', text: 'B' },
          { id: 'c', text: 'C' },
        ],
      }));
      component.setState({ isOpen: true });
      const popupListItemEls = component.find('.dropdown-list__popup__list__item');
      const fn = () => popupListItemEls.first().simulate('click');
      expect(fn).not.toThrow();
    });

    it('should invoke selected item change event with item when clicked', () => {
      const items = [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
        { id: 'c', text: 'C' },
      ];
      const onSelectedItemChange = sinon.spy();
      const component = shallow(h(DropdownList, {
        items,
        onSelectedItemChange,
      }));
      component.setState({ isOpen: true });
      const popupListItemEls = component.find('.dropdown-list__popup__list__item');
      popupListItemEls.first().simulate('click');
      expect(_.last(onSelectedItemChange.args)[0]).toEqual(items[0]);
    });

    it('should not throw when selected item change event is not defined when clicked', () => {
      const items = [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
        { id: 'c', text: 'C' },
      ];
      const component = shallow(h(DropdownList, {
        items,
      }));
      component.setState({ isOpen: true });
      const popupListItemEls = component.find('.dropdown-list__popup__list__item');
      const fn = () => popupListItemEls.first().simulate('click');
      expect(fn).not.toThrow();
    });

    it('should set "is open" to false when clicked', () => {
      const component = shallow(h(DropdownList, {
        items: [
          { id: 'a', text: 'A' },
        ],
      }));
      component.setState({ isOpen: true });
      const popupListItemEls = component.find('.dropdown-list__popup__list__item');
      popupListItemEls.first().simulate('click');
      expect(component.state('isOpen')).toEqual(false);
    });
  });

  describe('method getSelectedItemScrollTop', () => {
    it('should return 0 when selected item cannot be resolved', () => {
      const component = shallow(h(DropdownList, {
        items: [],
      }));
      const result = component.instance().getSelectedItemScrollTop();
      const expected = 0;
      expect(result).toEqual(expected);
    });

    it('should return (index of selected item - 2) * item height', () => {
      const component = shallow(h(DropdownList, {
        items: [
          { id: 'a', text: 'A' },
          { id: 'b', text: 'B' },
          { id: 'c', text: 'C' },
          { id: 'd', text: 'D' },
          { id: 'e', text: 'E' },
        ],
        selectedId: 'd',
      }));
      const result = component.instance().getSelectedItemScrollTop();
      const expected = 48;
      expect(result).toEqual(expected);
    });
  });

  describe('method handleButtonClick', () => {
    it('should set "is open" to true', () => {
      const component = shallow(h(DropdownList, {
        items: [],
      }));
      component.instance().handleButtonClick();
      expect(component.state('isOpen')).toEqual(true);
    });
  });
});

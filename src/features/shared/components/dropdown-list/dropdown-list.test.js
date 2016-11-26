import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { DropdownList } from './dropdown-list';

describe('DropdownList Component', () => {
  it('should be defined', () => {
    const component = shallow(h(DropdownList, {
      items: [],
    }));
    expect(component.length).toEqual(1);
  });
  it('should be closed by default');
  describe('child component __button', () => {
    it('should be defined when icon is defined');
    it('should not be defined when icon is not defined');
    it('should have correct click handler');
    it('should have correct icon value');
  });
  describe('element __input', () => {
    it('should be defined when icon is not defined');
    it('should not be defined when icon is defined');
    it('should set "is open" to true when clicked');
  });
  describe('element __input__text', () => {
    it('should be defined when text is defined');
    it('should not be defined when text is not defined');
    it('should contain text when text is defined');
    it('should contain selected item text when text is not defined and selected id is defined');
    it('should contain selected item text when text is not defined and selected item is defined');
    it('should contain empty string when text is not defined, selected id is not defined, and selected item is not defined');
  });
  describe('child component __input__caret', () => {
    it('should be defined when text is defined');
    it('should not be defined when text is not defined');
    it('should have caret-down icon');
    it('should have small size');
  });
  describe('element __overlay', () => {
    it('should be defined when open');
    it('should not be defined when not open');
    it('should set "is open" to false when clicked');
  });
  describe('element __popup', () => {
    it('should be defined when open');
    it('should not be defined when not open');
    it('should have correct ref function');
    it('should have height equal to length of items * item height + vertical padding');
  });
  describe('element __popup__list', () => {
    it('should be defined when open');
    it('should not be defined when not open');
  });
  describe('element __popup__list__item', () => {
    it('should be defined once for each item in items when open');
    it('should not be defined when not open');
    it('should invoke selected id change event with item when clicked');
    it('should not throw when selected id change event is not defined when clicked');
    it('should invoke selected item change event with item when clicked');
    it('should not throw when selected item change event is not defined when clicked');
    it('should set "is open" to false when clicked');
  });
  describe('method getSelectedItemScrollTop', () => {
    it('should return 0 when selected item cannot be resolved');
    it('should return (index of selected item - 2) * item height');
  });
  describe('method handleButtonClick', () => {
    it('should set "is open" to true');
  });
});

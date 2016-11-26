import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Sequencer } from './sequencer';

describe('Sequencer Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Sequencer, {
      isSelectingActive: false,
      onDuplicate: () => {},
      onResizeSelected: () => {},
      onSelectedNotesDelete: () => {},
      onSequenceClose: () => {},
      onShiftOctaveDown: () => {},
      onShiftOctaveUp: () => {},
      onToolSelect: () => {},
      onVerticalScroll: () => {},
      toolType: '',
    }));
    expect(component.length).toEqual(1);
  });
  describe('child component __toolbar', () => {
    it('should be defined');
    it('should be alternate when selecting');
    it('should not be alternate when not selecting');
  });
  describe('child component __toolbar__delete-button', () => {
    it('should be defined when alternate');
    it('should not be defined when not alternate');
    it('should have correct props');
  });
  describe('child component __toolbar__duplicate-button', () => {
    it('should be defined when alternate');
    it('should not be defined when not alternate');
    it('should have correct props');
  });
  describe('child component __toolbar__up-octave-button', () => {
    it('should be defined when alternate');
    it('should not be defined when not alternate');
    it('should have correct props');
  });
  describe('child component __toolbar__down-octave-button', () => {
    it('should be defined when alternate');
    it('should not be defined when not alternate');
    it('should have correct props');
  });
  describe('child component __toolbar__resize-dropdown', () => {
    it('should be defined when alternate');
    it('should not be defined when not alternate');
    it('should have correct props');
  });
  describe('child component __toolbar__close-button', () => {
    it('should be defined when alternate');
    it('should be defined when not alternate');
    it('should have correct props');
  });
  describe('child component __toolbar__select-tool-button', () => {
    it('should be defined when alternate');
    it('should not be defined when not alternate');
    it('should have correct props');
  });
  describe('child component __toolbar__draw-tool-button', () => {
    it('should be defined when alternate');
    it('should not be defined when not alternate');
    it('should have correct props');
  });
  describe('child component __toolbar__erase-tool-button', () => {
    it('should be defined when alternate');
    it('should not be defined when not alternate');
    it('should have correct props');
  });
  describe('child component __toolbar__pan-tool-button', () => {
    it('should be defined when alternate');
    it('should not be defined when not alternate');
    it('should have correct props');
  });
  describe('element __content', () => {
    it('should be defined');
    it('should invoke vertical scroll event with scroll offset in slots when scrolling vertically');
    it('should have correct ref function');
  });
  describe('element __content__wrapper', () => {
    it('should be defined');
  });
  describe('child component KeyContainer', () => {
    it('should be defined');
  });
  describe('child component GridContainer', () => {
    it('should be defined');
    it('should have correct value for sequencer content ref');
  });
  describe('method handleToolbarCloseButtonClick', () => {
    it('should');
  });
  describe('method handleToolbarDrawToolButtonClick', () => {
    it('should invoke tool select event with draw tool-type');
  });
  describe('method handleToolbarEraseToolButtonClick', () => {
    it('should invoke tool select event with erase tool-type');
  });
  describe('method handleToolbarPanToolButtonClick', () => {
    it('should invoke tool select event with pan tool-type');
  });
  describe('method handleToolbarResizeDropdownSelectedItemChange', () => {
    it('should invoke resize selected event with length');
  });
  describe('method handleToolbarSelectToolButtonClick', () => {
    it('should invoke tool select event with select tool-type');
  });
});

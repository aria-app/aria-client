import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Track } from './track';

describe('Track Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Track, {
      ...getRequiredProps(),
    }));
    expect(component.length).toEqual(1);
  });
  describe('element __body', () => {
    it('should be defined');
  });
  describe('element __body__header', () => {
    it('should be defined');
    it('should invoke track select event with track id when clicked');
  });
  describe('element __body__header__title', () => {
    it('should be defined');
    it('should contain track synth type');
  });
  describe('element __body__header__actions', () => {
    it('should be defined');
  });
  describe('element __body__header__actions__action--mute', () => {
    it('should be defined');
    it('should invoke track is muted toggle when clicked');
    it('should contain "M"');
  });
  describe('element __body__header__actions__action--solo', () => {
    it('should be defined');
    it('should invoke track is soloing toggle when clicked');
    it('should contain "S"');
  });
  describe('element __body__sequences', () => {
    it('should be defined');
    it('should have width of measure count * notes per measure * 2px per note');
  });
  describe('child component Sequence', () => {
    it('should be defined once for each sequence in track');
    it('should be selected if corresponsing sequence id is selected sequence id');
    it('should not be selected if corresponsing sequence id is not selected sequence id');
    it('should have correct handler for open event');
    it('should have correct handler for select event');
    it('should have sequence equal to corresponding sequence');
  });
  describe('element __body__sequences__add-button', () => {
    it('should be defined');
    it('should invoke sequence add event with track id and add position when clicked');
    it('should have translateX equal to add position * notes per measure * 2px per note');
  });
  describe('child component __body__sequences__add-button__icon', () => {
    it('should be defined');
    it('should have plus icon');
    it('should have large size');
  });
  describe('method handleBodySequencesSequenceOpen', () => {
    it('should invoke open event with sequence id');
  });
  describe('method handleBodySequencesSequenceSelect', () => {
    it('should invoke select event with sequence id');
  });
});

function getRequiredProps() {
  return {
    isMuted: false,
    isSoloing: false,
    onSequenceAdd: () => {},
    onSequenceContextMenu: () => {},
    onSequenceOpen: () => {},
    onSequenceSelect: () => {},
    onTrackIsMutedToggle: () => {},
    onTrackIsSoloingToggle: () => {},
    onTrackSelect: () => {},
    selectedSequenceId: '',
    songMeasureCount: 1,
    track: { sequences: [] },
  };
}

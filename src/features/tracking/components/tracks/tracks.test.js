import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Tracks } from './tracks';

describe('Tracks Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Tracks, {
      ...getRequiredProps(),
    }));
    expect(component.length).toEqual(1);
  });
  it('should invoke sequence deselect event when clicked');
  it('should stop propagation when clicked');
  describe('child component RulerContainer', () => {
    it('should be defined');
  });
  describe('child component Track', () => {
    it('should be defined once for each track in tracks');
    it('should be muted if corresponding track id is in muted track ids');
    it('should be soloing if corresponding track id is in soloing track ids');
    it('should have correct remaining props');
  });
  describe('element __add-button', () => {
    it('should be defined');
    it('should have width equal to (song measure count * notes per measure count * 2px per note) + number of possible y positions for notes');
    it('should invoke track add event when clicked');
  });
  describe('child component __add-button__icon', () => {
    it('should be defined');
    it('should have plus icon');
    it('should have large size');
  });
  describe('element __add-button__text', () => {
    it('should be defined');
    it('should contain "Add Track"');
  });
  describe('method handleTrackSelect', () => {
    it('should invoke track select event with track id');
  });
});

function getRequiredProps() {
  return {
    mutedTrackIds: [],
    onSequenceAdd: () => {},
    onSequenceContextMenu: () => {},
    onSequenceDeselect: () => {},
    onSequenceOpen: () => {},
    onSequenceSelect: () => {},
    onTrackAdd: () => {},
    onTrackIsMutedToggle: () => {},
    onTrackIsSoloingToggle: () => {},
    onTrackStage: () => {},
    selectedSequenceId: '',
    soloingTrackIds: [],
    songMeasureCount: 1,
    tracks: [],
  };
}

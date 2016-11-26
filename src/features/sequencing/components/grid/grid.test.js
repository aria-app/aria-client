import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Grid } from './grid';

describe('Grid Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Grid, {
      isPanning: false,
      measureCount: 1,
      onHorizontalScroll: () => {},
      onMouseMove: () => {},
      onPanningStart: () => {},
      onPanningUpdate: () => {},
      sequencerContentRef: {},
      toolType: '',
    }));
    expect(component.length).toEqual(1);
  });
  it('should invoke panning update event when clicked if pan tool is selected');
  it('should not invoke panning update event when clicked if pan tool is not selected');
  it('should invoke mouse move event with mouse position when mouse moves');
  it('should invoke panning update event when mouse moves if panning');
  it('should not invoke panning update event when mouse moves if not panning');
  it('should invoke horizontal scroll event with scroll offset in slots when scrolling horizontally');
  it('should have correct ref function');
  describe('element __wrapper', () => {
    it('should be defined');
    it('should have width of measureCount * 4 * 8 * 40');
    it('should have width of 0 when measureCount is undefined');
  });
  describe('child component SlotsContainer', () => {
    it('should be defined');
  });
  describe('child component NotesContainer', () => {
    it('should be defined');
  });
  describe('child component FenceContainer', () => {
    it('should be defined');
  });
  describe('child component SequencerTimelineContainer', () => {
    it('should be defined');
  });
});

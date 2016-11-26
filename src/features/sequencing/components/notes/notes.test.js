import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Notes } from './notes';

describe('Notes Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Notes, {
      ...getRequiredProps(),
    }));
    expect(component.length).toEqual(1);
  });
  it('should have grab class when pan tool is selected');
  it('should invoke move start event on mouse down when move tool is selected');
  it('should not invoke move start event on mouse down when move tool is not selected');
  it('should invoke select start event with true on mouse down when select tool is selected and ctrl key is held');
  it('should invoke select start event with true on mouse down when select tool is selected and meta key is held');
  it('should invoke select start event with false on mouse down when select tool is selected and neither ctrl or meta key is held');
  it('should not invoke select start event on mouse down when select tool is not selected');
  it('should invoke move update event on mouse move when moving');
  it('should not invoke move update event on mouse move when not moving');
  it('should invoke resize update event on mouse move when resizing');
  it('should not invoke resizing update event on mouse move when not resizing');
  it('should invoke select update event with true on mouse move when selecting and ctrl key is held');
  it('should invoke select update event with true on mouse move when selecting and meta key is held');
  it('should invoke select update event with false on mouse move when selecting and neither ctrl or meta key is held');
  it('should not invoke select update event on mouse move when not selecting');
  it('should invoke draw event on mouse up when draw tool is selected and not moving, panning, resizing, or selecting');
  it('should not invoke draw event on mouse up when draw tool is not selected');
  it('should not invoke draw event on mouse up when moving');
  it('should not invoke draw event on mouse up when panning');
  it('should not invoke draw event on mouse up when resizing');
  it('should not invoke draw event on mouse up when selecting');
  it('should have width equal to measure count * notes per measure * width of slot');
  it('should have width of 0 if measure count is undefined');
  describe('child component __note--ghost', () => {
    it('should be defined when draw tool is selected');
    it('should not be defined when draw tool is not selected');
    it('should not be selected');
    it('should have correct value for note');
  });
  describe('child component __note', () => {
    it('should be defined once for each note in notes');
    it('should have key equal to id of corresponding note');
    it('should be selected when note is in selected notes');
    it('should not be selected when note is not in selected notes');
    it('should have key equal to id of note');
    it('should have correct handler for endpoint mouse down event');
    it('should have correct handler for mouse down event');
    it('should have correct handler for mouse up event');
    it('should have note equal to corresponding note');
  });
  describe('method handleNoteMouseDown', () => {
    it('should return true if draw or select tool is selected');
    it('should return false if draw or select tool is selected');
    it('should invoke note preview event with first point of note if draw or select tool is selected');
    it('should not invoke note preview event if neither draw or select tool is selected');
    it('should invoke note select event with note and true when ctrl key is held if draw or select tool is selected');
    it('should invoke note select event with note and true when meta key is held if draw or select tool is selected');
    it('should invoke note select event with note and false when neither ctrl or meta key is held if draw or select tool is selected');
    it('should not invoke note select event if neither draw or select tool is selected');
    it('should invoke move start event if draw or select tool is selected');
    it('should not invoke move start event if neither draw or select tool is selected');
    it('should stop propagation if draw or select tool is selected');
    it('should not stop propagation if neither draw or select tool is selected');
  });
  describe('method handleNoteMouseUp', () => {
    it('should invoke erase event with note if erase tool is selected');
    it('should not invoke erase event if erase tool is not selected');
  });
  describe('method handleNoteEndpointMouseDown', () => {
    it('should invoke move start event if move tool is selected');
    it('should not invoke move start event if move tool is not selected');
    it('should invoke note preview event with last point of note if draw or select tool is selected');
    it('should not invoke note preview event if neither draw or select tool is selected');
    it('should invoke note select event with note and true when ctrl key is held if draw or select tool is selected');
    it('should invoke note select event with note and true when meta key is held if draw or select tool is selected');
    it('should invoke note select event with note and false when neither ctrl or meta key is held if draw or select tool is selected');
    it('should not invoke note select event if neither draw or select tool is selected');
    it('should invoke resize start event if draw or select tool is selected');
    it('should not invoke resize start event if neither draw or select tool is selected');
  });
});

function getRequiredProps() {
  return {
    isMoving: false,
    isPanning: false,
    isResizing: false,
    isSelecting: false,
    measureCount: 1,
    mousePoint: { x: 0, y: 0 },
    notes: [],
    onDraw: () => {},
    onErase: () => {},
    onMoveStart: () => {},
    onMoveUpdate: () => {},
    onNotePreview: () => {},
    onNoteSelect: () => {},
    onResizeStart: () => {},
    onResizeUpdate: () => {},
    onSelectStart: () => {},
    onSelectUpdate: () => {},
    selectedNotes: [],
    toolType: '',
  };
}

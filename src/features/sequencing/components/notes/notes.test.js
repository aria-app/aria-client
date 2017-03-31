import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import shared from '../../../shared';
import { Notes } from './notes';

const { toolTypes } = shared.constants;

describe('Notes Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Notes, {
      ...getRequiredProps(),
    }));
    expect(component.length).toEqual(1);
  });

  it('should invoke select start event with true on mouse down when select tool is selected and ctrl key is held', () => {
    const onSelectStart = sinon.spy();
    const component = shallow(h(Notes, {
      ...getRequiredProps(),
      toolType: toolTypes.SELECT,
      onSelectStart,
    }));
    component.simulate('mousedown', {
      ctrlKey: true,
      metaKey: false,
    });
    expect(onSelectStart.lastCall.args).toEqual([true]);
  });

  it('should invoke select start event with true on mouse down when select tool is selected and meta key is held', () => {
    const onSelectStart = sinon.spy();
    const component = shallow(h(Notes, {
      ...getRequiredProps(),
      toolType: toolTypes.SELECT,
      onSelectStart,
    }));
    component.simulate('mousedown', {
      ctrlKey: false,
      metaKey: true,
    });
    expect(onSelectStart.lastCall.args).toEqual([true]);
  });

  it('should invoke select start event with false on mouse down when select tool is selected and neither ctrl or meta key is held', () => {
    const onSelectStart = sinon.spy();
    const component = shallow(h(Notes, {
      ...getRequiredProps(),
      toolType: toolTypes.SELECT,
      onSelectStart,
    }));
    component.simulate('mousedown', {
      ctrlKey: false,
      metaKey: false,
    });
    expect(onSelectStart.lastCall.args).toEqual([false]);
  });

  it('should not invoke select start event on mouse down when select tool is not selected', () => {
    const onSelectStart = sinon.spy();
    const component = shallow(h(Notes, {
      ...getRequiredProps(),
      toolType: toolTypes.PAN,
      onSelectStart,
    }));
    component.simulate('mousedown');
    expect(onSelectStart.called).toEqual(false);
  });

  it('should invoke select update event with true on mouse move when selecting and ctrl key is held', () => {
    const onSelectUpdate = sinon.spy();
    const component = shallow(h(Notes, {
      ...getRequiredProps(),
      isSelecting: true,
      onSelectUpdate,
    }));
    component.simulate('mousemove', {
      ctrlKey: true,
      metaKey: false,
    });
    expect(onSelectUpdate.lastCall.args).toEqual([true]);
  });

  it('should invoke select update event with true on mouse move when selecting and meta key is held', () => {
    const onSelectUpdate = sinon.spy();
    const component = shallow(h(Notes, {
      ...getRequiredProps(),
      isSelecting: true,
      onSelectUpdate,
    }));
    component.simulate('mousemove', {
      ctrlKey: false,
      metaKey: true,
    });
    expect(onSelectUpdate.lastCall.args).toEqual([true]);
  });

  it('should invoke select update event with false on mouse move when selecting and neither ctrl or meta key is held', () => {
    const onSelectUpdate = sinon.spy();
    const component = shallow(h(Notes, {
      ...getRequiredProps(),
      isSelecting: true,
      onSelectUpdate,
    }));
    component.simulate('mousemove', {
      ctrlKey: false,
      metaKey: false,
    });
    expect(onSelectUpdate.lastCall.args).toEqual([false]);
  });

  it('should not invoke select update event on mouse move when not selecting', () => {
    const onSelectUpdate = sinon.spy();
    const component = shallow(h(Notes, {
      ...getRequiredProps(),
      isSelecting: false,
      onSelectUpdate,
    }));
    component.simulate('mousemove');
    expect(onSelectUpdate.called).toEqual(false);
  });

  it('should invoke draw event on mouse up when draw tool is selected and not moving, resizing, or selecting', () => {
    const onDraw = sinon.spy();
    const component = shallow(h(Notes, {
      ...getRequiredProps(),
      isMoving: false,
      isResizing: false,
      isSelecting: false,
      toolType: toolTypes.DRAW,
      onDraw,
    }));
    component.simulate('mouseup');
    expect(onDraw.calledOnce).toEqual(true);
  });

  it('should not invoke draw event on mouse up when draw tool is not selected', () => {
    const onDraw = sinon.spy();
    const component = shallow(h(Notes, {
      ...getRequiredProps(),
      isMoving: false,
      isResizing: false,
      isSelecting: false,
      toolType: toolTypes.PAN,
      onDraw,
    }));
    component.simulate('mouseup');
    expect(onDraw.called).toEqual(false);
  });

  it('should not invoke draw event on mouse up when moving', () => {
    const onDraw = sinon.spy();
    const component = shallow(h(Notes, {
      ...getRequiredProps(),
      isMoving: true,
      isResizing: false,
      isSelecting: false,
      toolType: toolTypes.DRAW,
      onDraw,
    }));
    component.simulate('mouseup');
    expect(onDraw.called).toEqual(false);
  });

  it('should not invoke draw event on mouse up when resizing', () => {
    const onDraw = sinon.spy();
    const component = shallow(h(Notes, {
      ...getRequiredProps(),
      isMoving: false,
      isResizing: true,
      isSelecting: false,
      toolType: toolTypes.DRAW,
      onDraw,
    }));
    component.simulate('mouseup');
    expect(onDraw.called).toEqual(false);
  });

  it('should not invoke draw event on mouse up when selecting', () => {
    const onDraw = sinon.spy();
    const component = shallow(h(Notes, {
      ...getRequiredProps(),
      isMoving: false,
      isResizing: false,
      isSelecting: true,
      toolType: toolTypes.DRAW,
      onDraw,
    }));
    component.simulate('mouseup');
    expect(onDraw.called).toEqual(false);
  });

  it('should have width equal to measure count * notes per measure * width of slot', () => {
    const measureCount = 3;
    const component = shallow(h(Notes, {
      ...getRequiredProps(),
      measureCount,
    }));
    const expected = measureCount * 32 * 40;
    component.simulate('mouseup');
    expect(component.prop('style').width).toEqual(expected);
  });

  describe('child component __note--ghost', () => {
    it('should be defined when draw tool is selected', () => {
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.DRAW,
      }));
      const noteGhostEl = component.find('.notes__note--ghost');
      expect(noteGhostEl.length).toEqual(1);
    });

    it('should not be defined when draw tool is not selected', () => {
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.PAN,
      }));
      const noteGhostEl = component.find('.notes__note--ghost');
      expect(noteGhostEl.length).toEqual(0);
    });

    it('should have correct value for note', () => {
      const mousePoint = {
        x: 10,
        y: 10,
      };
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.DRAW,
        mousePoint,
      }));
      const ghostNote = {
        points: [
          { x: 10, y: 10 },
          { x: 11, y: 10 },
        ],
      };
      const noteGhostEl = component.find('.notes__note--ghost');
      expect(noteGhostEl.prop('note')).toEqual(ghostNote);
    });
  });

  describe('child component __note', () => {
    it('should be defined once for each note in notes', () => {
      const notes = [
        { id: 'a' },
        { id: 'b' },
      ];
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        notes,
      }));
      const noteEls = component.find('.notes__note');
      expect(noteEls.length).toEqual(2);
    });

    it('should have key equal to id of corresponding note', () => {
      const firstId = 'a';
      const notes = [
        { id: firstId },
        { id: 'b' },
      ];
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        notes,
      }));
      const firstNoteEl = component.find('.notes__note').first();
      expect(firstNoteEl.key()).toEqual(firstId);
    });

    it('should be selected when note is in selected notes', () => {
      const notes = [
        { id: 'a' },
        { id: 'b' },
      ];
      const selectedNotes = [
        { id: 'a' },
      ];
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        notes,
        selectedNotes,
      }));
      const firstNoteEl = component.find('.notes__note').first();
      expect(firstNoteEl.prop('isSelected')).toEqual(true);
    });

    it('should not be selected when note is not in selected notes', () => {
      const notes = [
        { id: 'a' },
        { id: 'b' },
      ];
      const selectedNotes = [
        { id: 'b' },
      ];
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        notes,
        selectedNotes,
      }));
      const firstNoteEl = component.find('.notes__note').first();
      expect(firstNoteEl.prop('isSelected')).toEqual(false);
    });

    it('should have correct handler for endpoint mouse down event', () => {
      const notes = [
        { id: 'a' },
        { id: 'b' },
      ];
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        notes,
      }));
      const firstNoteEl = component.find('.notes__note').first();
      const { handleNoteEndpointMouseDown } = component.instance();
      expect(firstNoteEl.prop('onEndpointMouseDown')).toEqual(handleNoteEndpointMouseDown);
    });

    it('should have correct handler for mouse down event', () => {
      const notes = [
        { id: 'a' },
        { id: 'b' },
      ];
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        notes,
      }));
      const firstNoteEl = component.find('.notes__note').first();
      const { handleNoteMouseDown } = component.instance();
      expect(firstNoteEl.prop('onMouseDown')).toEqual(handleNoteMouseDown);
    });

    it('should have correct handler for mouse up event', () => {
      const notes = [
        { id: 'a' },
        { id: 'b' },
      ];
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        notes,
      }));
      const firstNoteEl = component.find('.notes__note').first();
      const { handleNoteMouseUp } = component.instance();
      expect(firstNoteEl.prop('onMouseUp')).toEqual(handleNoteMouseUp);
    });

    it('should have note equal to corresponding note', () => {
      const notes = [
        { id: 'a' },
        { id: 'b' },
      ];
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        notes,
      }));
      const firstNoteEl = component.find('.notes__note').first();
      expect(firstNoteEl.prop('note')).toEqual(notes[0]);
    });
  });

  describe('method handleNoteMouseDown', () => {
    it('should return false if draw tool is selected', () => {
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.DRAW,
      }));
      const note = {
        id: 'a',
      };
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation: () => {},
      };
      const result = component.instance().handleNoteMouseDown(note, e);
      expect(result).toEqual(false);
    });

    it('should return false if select tool is selected', () => {
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.SELECT,
      }));
      const note = {
        id: 'a',
      };
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation: () => {},
      };
      const result = component.instance().handleNoteMouseDown(note, e);
      expect(result).toEqual(false);
    });

    it('should return true if neither draw or select tool is selected', () => {
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.PAN,
      }));
      const note = {
        id: 'a',
      };
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation: () => {},
      };
      const result = component.instance().handleNoteMouseDown(note, e);
      expect(result).toEqual(true);
    });

    it('should invoke note preview event with first point of note if draw tool is selected', () => {
      const onNotePreview = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.DRAW,
        onNotePreview,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteMouseDown(note, e);
      expect(onNotePreview.lastCall.args).toEqual([note.points[0]]);
    });

    it('should invoke note preview event with first point of note if select tool is selected', () => {
      const onNotePreview = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.SELECT,
        onNotePreview,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteMouseDown(note, e);
      expect(onNotePreview.lastCall.args).toEqual([note.points[0]]);
    });

    it('should not invoke note preview event when neither draw or select tool is selected', () => {
      const onNotePreview = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.PAN,
        onNotePreview,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteMouseDown(note, e);
      expect(onNotePreview.called).toEqual(false);
    });

    it('should invoke note select event with note and true when ctrl key is held and draw tool is selected', () => {
      const onNoteSelect = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.DRAW,
        onNoteSelect,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: true,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteMouseDown(note, e);
      expect(onNoteSelect.lastCall.args).toEqual([note, true]);
    });

    it('should invoke note select event with note and true when ctrl key is held and select tool is selected', () => {
      const onNoteSelect = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.SELECT,
        onNoteSelect,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: true,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteMouseDown(note, e);
      expect(onNoteSelect.lastCall.args).toEqual([note, true]);
    });

    it('should invoke note select event with note and true when meta key is held and draw tool is selected', () => {
      const onNoteSelect = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.DRAW,
        onNoteSelect,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: false,
        metaKey: true,
        stopPropagation: () => {},
      };
      component.instance().handleNoteMouseDown(note, e);
      expect(onNoteSelect.lastCall.args).toEqual([note, true]);
    });

    it('should invoke note select event with note and true when meta key is held and select tool is selected', () => {
      const onNoteSelect = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.SELECT,
        onNoteSelect,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: false,
        metaKey: true,
        stopPropagation: () => {},
      };
      component.instance().handleNoteMouseDown(note, e);
      expect(onNoteSelect.lastCall.args).toEqual([note, true]);
    });

    it('should invoke note select event with note and false when neither ctrl or meta key is held and draw tool is selected', () => {
      const onNoteSelect = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.DRAW,
        onNoteSelect,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteMouseDown(note, e);
      expect(onNoteSelect.lastCall.args).toEqual([note, false]);
    });

    it('should invoke note select event with note and false when neither ctrl or meta key is held and select tool is selected', () => {
      const onNoteSelect = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.SELECT,
        onNoteSelect,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteMouseDown(note, e);
      expect(onNoteSelect.lastCall.args).toEqual([note, false]);
    });

    it('should not invoke note select event when neither draw or select tool is selected', () => {
      const onNoteSelect = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.PAN,
        onNoteSelect,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteMouseDown(note, e);
      expect(onNoteSelect.called).toEqual(false);
    });

    it('should invoke move start event when draw tool is selected', () => {
      const onMoveStart = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.DRAW,
        onMoveStart,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteMouseDown(note, e);
      expect(onMoveStart.calledOnce).toEqual(true);
    });

    it('should invoke move start event when select tool is selected', () => {
      const onMoveStart = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.SELECT,
        onMoveStart,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteMouseDown(note, e);
      expect(onMoveStart.calledOnce).toEqual(true);
    });

    it('should not invoke move start event when neither draw or select tool is selected', () => {
      const onMoveStart = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.PAN,
        onMoveStart,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteMouseDown(note, e);
      expect(onMoveStart.called).toEqual(false);
    });

    it('should stop propagation when draw tool is selected', () => {
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.DRAW,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const stopPropagation = sinon.spy();
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation,
      };
      component.instance().handleNoteMouseDown(note, e);
      expect(stopPropagation.calledOnce).toEqual(true);
    });

    it('should stop propagation when select tool is selected', () => {
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.SELECT,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const stopPropagation = sinon.spy();
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation,
      };
      component.instance().handleNoteMouseDown(note, e);
      expect(stopPropagation.calledOnce).toEqual(true);
    });

    it('should not stop propagation when neither draw or select tool is selected', () => {
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.PAN,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const stopPropagation = sinon.spy();
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation,
      };
      component.instance().handleNoteMouseDown(note, e);
      expect(stopPropagation.called).toEqual(false);
    });
  });

  describe('method handleNoteMouseUp', () => {
    it('should invoke erase event with note if erase tool is selected', () => {
      const onErase = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.ERASE,
        onErase,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      component.instance().handleNoteMouseUp(note);
      expect(onErase.lastCall.args).toEqual([note]);
    });

    it('should not invoke erase event if erase tool is not selected', () => {
      const onErase = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.PAN,
        onErase,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      component.instance().handleNoteMouseUp(note);
      expect(onErase.called).toEqual(false);
    });
  });

  describe('method handleNoteEndpointMouseDown', () => {
    it('should invoke move start event when move tool is selected', () => {
      const onMoveStart = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.MOVE,
        onMoveStart,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteEndpointMouseDown(note, e);
      expect(onMoveStart.calledOnce).toEqual(true);
    });

    it('should not invoke move start event when move tool is not selected', () => {
      const onMoveStart = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.PAN,
        onMoveStart,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteEndpointMouseDown(note, e);
      expect(onMoveStart.called).toEqual(false);
    });

    it('should invoke note preview event with last point of note when draw tool is selected', () => {
      const onNotePreview = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.DRAW,
        onNotePreview,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteEndpointMouseDown(note, e);
      expect(onNotePreview.lastCall.args).toEqual([note.points[1]]);
    });

    it('should invoke note preview event with last point of note when select tool is selected', () => {
      const onNotePreview = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.SELECT,
        onNotePreview,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteEndpointMouseDown(note, e);
      expect(onNotePreview.lastCall.args).toEqual([note.points[1]]);
    });

    it('should not invoke note preview event when neither draw or select tool is selected', () => {
      const onNotePreview = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.PAN,
        onNotePreview,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteEndpointMouseDown(note, e);
      expect(onNotePreview.called).toEqual(false);
    });

    it('should invoke note select event with note and true when ctrl key is held and draw tool is selected', () => {
      const onNoteSelect = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.DRAW,
        onNoteSelect,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: true,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteEndpointMouseDown(note, e);
      expect(onNoteSelect.lastCall.args).toEqual([note, true]);
    });

    it('should invoke note select event with note and true when ctrl key is held and select tool is selected', () => {
      const onNoteSelect = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.SELECT,
        onNoteSelect,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: true,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteEndpointMouseDown(note, e);
      expect(onNoteSelect.lastCall.args).toEqual([note, true]);
    });

    it('should invoke note select event with note and true when meta key is held and draw tool is selected', () => {
      const onNoteSelect = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.DRAW,
        onNoteSelect,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: false,
        metaKey: true,
        stopPropagation: () => {},
      };
      component.instance().handleNoteEndpointMouseDown(note, e);
      expect(onNoteSelect.lastCall.args).toEqual([note, true]);
    });

    it('should invoke note select event with note and true when meta key is held and select tool is selected', () => {
      const onNoteSelect = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.SELECT,
        onNoteSelect,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: false,
        metaKey: true,
        stopPropagation: () => {},
      };
      component.instance().handleNoteEndpointMouseDown(note, e);
      expect(onNoteSelect.lastCall.args).toEqual([note, true]);
    });

    it('should invoke note select event with note and false when neither ctrl or meta key is held and draw tool is selected', () => {
      const onNoteSelect = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.DRAW,
        onNoteSelect,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteEndpointMouseDown(note, e);
      expect(onNoteSelect.lastCall.args).toEqual([note, false]);
    });

    it('should invoke note select event with note and false when neither ctrl or meta key is held and select tool is selected', () => {
      const onNoteSelect = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.SELECT,
        onNoteSelect,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteEndpointMouseDown(note, e);
      expect(onNoteSelect.lastCall.args).toEqual([note, false]);
    });

    it('should not invoke note select event when neither draw or select tool is selected', () => {
      const onNoteSelect = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.PAN,
        onNoteSelect,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: false,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteEndpointMouseDown(note, e);
      expect(onNoteSelect.called).toEqual(false);
    });

    it('should invoke resize start event when draw tool is selected', () => {
      const onResizeStart = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.DRAW,
        onResizeStart,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: true,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteEndpointMouseDown(note, e);
      expect(onResizeStart.calledOnce).toEqual(true);
    });

    it('should invoke resize start event when select tool is selected', () => {
      const onResizeStart = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.SELECT,
        onResizeStart,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: true,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteEndpointMouseDown(note, e);
      expect(onResizeStart.calledOnce).toEqual(true);
    });

    it('should not invoke resize start event when neither draw or select tool is selected', () => {
      const onResizeStart = sinon.spy();
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
        toolType: toolTypes.PAN,
        onResizeStart,
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const e = {
        ctrlKey: true,
        metaKey: false,
        stopPropagation: () => {},
      };
      component.instance().handleNoteEndpointMouseDown(note, e);
      expect(onResizeStart.called).toEqual(false);
    });

    it('should stop propagation', () => {
      const component = shallow(h(Notes, {
        ...getRequiredProps(),
      }));
      const note = {
        id: 'a',
        points: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const stopPropagation = sinon.spy();
      const e = {
        ctrlKey: true,
        metaKey: false,
        stopPropagation,
      };
      component.instance().handleNoteEndpointMouseDown(note, e);
      expect(stopPropagation.calledOnce).toEqual(true);
    });
  });
});

function getRequiredProps() {
  return {
    isMoving: false,
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

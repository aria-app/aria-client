import * as actions from './actions';

describe('App Actions', () => {
  describe('bpmModalClosed', () => {
    it('should return action with type BPM_MODAL_CLOSED', () => {
      const expected = { type: actions.BPM_MODAL_CLOSED };
      const result = actions.bpmModalClosed();
      expect(result).toEqual(expected);
    });
  });

  describe('bpmModalOpened', () => {
    it('should return action with type BPM_MODAL_OPENED', () => {
      const expected = { type: actions.BPM_MODAL_OPENED };
      const result = actions.bpmModalOpened();
      expect(result).toEqual(expected);
    });
  });

  describe('fileDragCancelled', () => {
    it('should return action with type FILE_DRAG_CANCELLED', () => {
      const expected = { type: actions.FILE_DRAG_CANCELLED };
      const result = actions.fileDragCancelled();
      expect(result).toEqual(expected);
    });
  });

  describe('fileDragStarted', () => {
    it('should return action with type FILE_DRAG_STARTED', () => {
      const expected = { type: actions.FILE_DRAG_STARTED };
      const result = actions.fileDragStarted();
      expect(result).toEqual(expected);
    });
  });
});

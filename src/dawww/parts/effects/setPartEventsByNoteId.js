import filter from 'lodash/fp/filter';
import getOr from 'lodash/fp/getOr';
import noop from 'lodash/fp/noop';
import times from 'lodash/fp/times';
import * as actions from '../../actions';

export function setPartEventsByNoteId(getState, action, shared) {
  const noteId = getOr('', 'payload.id', action);
  const note = getOr({}, `song.notes[${noteId}]`, getState());
  const sequence = getOr({}, `song.sequences[${note.sequenceId}]`, getState());
  const trackId = getOr('', 'trackId', sequence);
  const allNotes = getOr({}, 'song.notes', getState());
  const notesInSequence = filter(
    n => n.sequenceId === note.sequenceId,
    allNotes,
  );
  const part = getOr({ at: noop }, `parts[${note.sequenceId}]`, getState());

  times(i => {
    const notesAtStep = filter(n => {
      const notePosition = getOr(-1, 'points[0].x', n);
      return notePosition === i;
    }, notesInSequence);
    const noteIdsAtStep = notesAtStep.map(getOr('', 'id'));

    const fn = (payload, time) => {
      const focusedSequenceId = getOr('', 'song.focusedSequenceId', getState());

      if (focusedSequenceId !== '' && focusedSequenceId === note.sequenceId) {
        shared.dispatch(actions.positionSet(i));
      }

      shared.dispatch(
        actions.partStepTriggered({
          noteIds: payload.noteIds,
          trackId: payload.trackId,
          time,
        }),
      );
    };
    const payload = {
      noteIds: noteIdsAtStep,
      i,
      trackId,
    };

    part.at(i, { fn, payload });
  }, part.length);
}

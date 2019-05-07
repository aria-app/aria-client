import filter from 'lodash/fp/filter';
import getOr from 'lodash/fp/getOr';
import noop from 'lodash/fp/noop';
import times from 'lodash/fp/times';
import * as actions from '../../actions';

export function setPartEvents(getState, action, shared) {
  const sequence = getOr({}, 'payload.sequence', action);
  const sequenceId = getOr('', 'id', sequence);
  const trackId = getOr('', 'trackId', sequence);
  const allNotes = getOr({}, 'song.notes', getState());
  const notesInSequence = filter(n => n.sequenceId === sequenceId, allNotes);
  const part = getOr({ at: noop }, `parts[${sequenceId}]`, getState());

  times(i => {
    const notesAtStep = filter(note => {
      const notePosition = getOr(-1, 'points[0].x', note);
      return notePosition === i;
    }, notesInSequence);
    const noteIdsAtStep = notesAtStep.map(getOr('', 'id'));

    const fn = (payload, time) => {
      const focusedSequenceId = getOr('', 'song.focusedSequenceId', getState());

      if (focusedSequenceId !== '' && focusedSequenceId === sequenceId) {
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

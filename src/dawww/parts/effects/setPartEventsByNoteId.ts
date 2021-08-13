import filter from 'lodash/fp/filter';
import times from 'lodash/fp/times';

import * as actions from '../../actions';
import { DawwwEffects } from '../../types';

export const setPartEventsByNoteId: DawwwEffects = (
  getState,
  action,
  { dispatch },
) => {
  const { id, note } = action.payload;
  const { parts, song } = getState();
  const { notes, sequences } = song;

  const { sequenceId } = notes[id] || note;
  const { trackId } = sequences[sequenceId] || {};
  const notesInSequence = filter((n) => n.sequenceId === sequenceId, notes);

  times((stepIndex) => {
    const notesAtStep = filter((n) => {
      const notePosition = n.points?.[0].x;
      return notePosition === stepIndex;
    }, notesInSequence);
    const noteIdsAtStep = notesAtStep.map((n) => n.id);

    const fn = (payload, time) => {
      const { song } = getState();

      if (song.focusedSequenceId === sequenceId) {
        dispatch(actions.positionSet(stepIndex));
      }

      dispatch(
        actions.partStepTriggered({
          noteIds: payload.noteIds,
          trackId: payload.trackId,
          time,
        }),
      );
    };
    const payload = {
      noteIds: noteIdsAtStep,
      i: stepIndex,
      trackId,
    };

    parts[sequenceId].at(stepIndex, { fn, payload });
  }, parts[sequenceId]?.length || 0);
};

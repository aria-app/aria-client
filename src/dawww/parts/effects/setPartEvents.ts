import filter from 'lodash/fp/filter';
import times from 'lodash/fp/times';

import * as actions from '../../actions';
import { DawwwEffects } from '../../types';

export const setPartEvents: DawwwEffects = (getState, action, { dispatch }) => {
  const { sequence } = action.payload;
  const { parts, song } = getState();
  const { id, trackId } = sequence;
  const notesInSequence = filter((n) => n.sequenceId === id, song.notes);

  times((stepIndex) => {
    const notesAtStep = filter((n) => {
      const notePosition = n.points?.[0].x;
      return notePosition === stepIndex;
    }, notesInSequence);
    const noteIdsAtStep = notesAtStep.map((n) => n.id);

    const fn = (payload, time) => {
      const { playbackState, position, song } = getState();
      const shouldSetPosition =
        stepIndex !== position &&
        (playbackState !== 'STOPPED' || stepIndex === 0) &&
        song.focusedSequenceId === id;

      if (shouldSetPosition) {
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

    parts[id].at(stepIndex, { fn, payload });
  }, parts[id].length);
};

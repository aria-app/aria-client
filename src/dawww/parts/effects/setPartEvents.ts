import times from 'lodash/fp/times';

import { Sequence } from '../../../types';
import * as actions from '../../actions';
import { ActionEffect } from '../../types';

export const setPartEvents: ActionEffect<any> = (getState, action, shared) => {
  const { parts } = getState();
  const sequence: Sequence = action.payload.sequence;
  const trackId = sequence.track.id;
  const part = parts[sequence.id];

  times((i) => {
    const noteIdsAtStep = sequence.notes
      .filter((note) => note.points[0].x === i)
      .map((note) => note.id);

    const fn = (payload, time) => {
      const { playbackState, position, song } = getState();
      const focusedSequenceId = song.focusedSequenceId;
      const isSelectedSequence = focusedSequenceId === sequence.id;
      const shouldSetPosition =
        i !== position && (playbackState !== 'STOPPED' || i === 0);

      if (shouldSetPosition && isSelectedSequence) {
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
      i,
      noteIds: noteIdsAtStep,
      trackId,
    };

    part.at(i, { fn, payload });
  }, part.length);
};

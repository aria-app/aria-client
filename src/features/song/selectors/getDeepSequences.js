import filter from "lodash/fp/filter";
import pipe from "lodash/fp/pipe";
import map from "lodash/fp/map";
import { getNotesArray } from "./getNotesArray";
import { getSequencesArray } from "./getSequencesArray";

const getDeepSequence = state => sequence => ({
  ...sequence,
  notes: pipe(
    getNotesArray,
    filter({ sequenceId: sequence.id }),
  )(state),
});

export const getDeepSequences = state =>
  pipe(
    getSequencesArray,
    map(getDeepSequence(state)),
  )(state);

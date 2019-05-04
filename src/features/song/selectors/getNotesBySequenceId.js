import filter from "lodash/fp/filter";
import compose from "lodash/fp/compose";
import { getNotesArray } from "./getNotesArray";

export const getNotesBySequenceId = sequenceId => state =>
  compose(
    filter(note => note.sequenceId === sequenceId),
    getNotesArray,
  )(state);

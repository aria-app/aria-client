import getOr from "lodash/fp/getOr";
import pipe from "lodash/fp/pipe";
import { getSequences } from "./getSequences";

export const getSequenceById = id =>
  pipe(
    getSequences,
    getOr({}, id),
  );

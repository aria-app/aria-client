import { getBPM } from "./getBPM";
import { getId } from "./getId";
import { getMeasureCount } from "./getMeasureCount";
import { getName } from "./getName";
import { getNotes } from "./getNotes";
import { getSequences } from "./getSequences";
import { getTracks } from "./getTracks";
import { getUserId } from "./getUserId";

export const getSong = state => ({
  bpm: getBPM(state),
  id: getId(state),
  measureCount: getMeasureCount(state),
  name: getName(state),
  notes: getNotes(state),
  sequences: getSequences(state),
  tracks: getTracks(state),
  userId: getUserId(state),
});

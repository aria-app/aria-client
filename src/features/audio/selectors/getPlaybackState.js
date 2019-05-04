import getOr from "lodash/fp/getOr";
import { NAME } from "../constants";

export const getPlaybackState = getOr("", `${NAME}.playbackState`);

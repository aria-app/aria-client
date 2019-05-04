import getOr from "lodash/fp/getOr";
import { NAME } from "../constants";

export const getTracks = getOr({}, `${NAME}.present.tracks`);

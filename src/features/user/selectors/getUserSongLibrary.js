import getOr from "lodash/fp/getOr";
import { NAME } from "../constants";

export const getUserSongLibrary = getOr({}, `${NAME}.userSongLibrary`);

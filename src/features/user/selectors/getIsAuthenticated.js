import isNil from "lodash/fp/isNil";
import { getUser } from "./getUser";

export const getIsAuthenticated = state => !isNil(getUser(state));

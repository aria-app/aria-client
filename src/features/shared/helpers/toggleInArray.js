import includes from "lodash/fp/includes";
import without from "lodash/fp/without";

export function toggleInArray(item, array) {
  return includes(item, array) ? without([item], array) : [...array, item];
}

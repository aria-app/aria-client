export function hideIf(condition) {
  return result => (condition ? null : result);
}

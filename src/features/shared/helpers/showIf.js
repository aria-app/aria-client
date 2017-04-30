export function showIf(condition) {
  return result => (condition ? result : null);
}

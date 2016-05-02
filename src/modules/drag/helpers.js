export function getPositionOffset(start, end) {
  return {
    x: end.x - start.x,
    y: end.y - start.y,
  };
}

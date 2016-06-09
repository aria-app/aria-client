export function getPointOffset(start, end) {
  return {
    x: end.x - start.x,
    y: end.y - start.y,
  };
}

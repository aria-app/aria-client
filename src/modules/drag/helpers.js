export function addPositions(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
}

export function getPositionOffset(start, end) {
  return {
    x: end.x - start.x,
    y: end.y - start.y,
  };
}

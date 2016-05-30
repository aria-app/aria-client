export function measuresToSeconds(measures) {
  return `(${measures * 32} * 32n)`;
}

export function sizeToSeconds(size) {
  return `(${size + 1} * 32n)`;
}

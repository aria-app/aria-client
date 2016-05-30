export function measuresToSeconds(measures) {
  return measures > 0 ? sizeToSeconds(measures * 32) : '0';
}

export function sizeToSeconds(size) {
  return `(${size} * 32n)`;
}

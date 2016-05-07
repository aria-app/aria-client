export function getPanStart(el, e) {
  return {
    scrollLeft: el.parentElement.parentElement.scrollLeft,
    scrollTop: el.parentElement.parentElement.parentElement.parentElement.scrollTop,
    x: e.pageX,
    y: e.pageY,
  };
}

export function panScrollContainer(el, e, start) {
  const dx = e.pageX - start.x;
  const dy = e.pageY - start.y;
  const scrollLeftElement = el.parentElement.parentElement;
  const scrollTopElement = el.parentElement
    .parentElement
    .parentElement
    .parentElement;

  scrollLeftElement.scrollLeft = start.scrollLeft - dx;
  scrollTopElement.scrollTop = start.scrollTop - dy;
}

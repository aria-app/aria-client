export function getStartPoint(scrollLeftElement, scrollTopElement, e) {
  return {
    scrollLeft: scrollLeftElement.scrollLeft,
    scrollTop: scrollTopElement.scrollTop,
    x: e.pageX,
    y: e.pageY,
  };
}

export function panScrollContainer(scrollLeftElement, scrollTopElement, e, start) {
  const dx = e.pageX - start.x;
  const dy = e.pageY - start.y;

  scrollLeftElement.scrollLeft = start.scrollLeft - dx;
  scrollTopElement.scrollTop = start.scrollTop - dy;
}

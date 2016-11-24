export function getMousePoint(scrollLeftEl, scrollTopEl, e) {
  const toSlotNumber = num => Math.floor(num / 40);

  return {
    x: toSlotNumber(e.pageX - scrollLeftEl.offsetLeft + scrollLeftEl.scrollLeft),
    y: toSlotNumber(e.pageY - scrollLeftEl.offsetTop + scrollTopEl.scrollTop),
  };
}

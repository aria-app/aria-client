export function getCenteredScroll(el: HTMLElement): number {
  return el.scrollHeight / 2 - el.offsetHeight / 2;
}

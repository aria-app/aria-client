import { Box } from 'aria-ui';
import { FC, memo, useCallback, useState } from 'react';

type PannerStartPoint = {
  scrollLeft: number;
  scrollTop: number;
  x: number;
  y: number;
} | null;

export interface PannerProps {
  scrollLeftEl: HTMLElement | null;
  scrollTopEl: HTMLElement | null;
}

export const Panner: FC<PannerProps> = memo((props) => {
  const { scrollLeftEl, scrollTopEl } = props;

  const [startPoint, setStartPoint] = useState<PannerStartPoint>(null);

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!scrollLeftEl || !scrollTopEl) return;

      setStartPoint({
        scrollLeft: scrollLeftEl.scrollLeft,
        scrollTop: scrollTopEl.scrollTop,
        x: e.pageX,
        y: e.pageY,
      });
    },
    [scrollLeftEl, scrollTopEl],
  );

  const handleMouseLeave = useCallback(() => {
    if (!startPoint) return;

    setStartPoint(null);
  }, [startPoint]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!startPoint || !scrollLeftEl || !scrollTopEl) return;

      const dx = e.pageX - startPoint.x;
      const dy = e.pageY - startPoint.y;
      const scrollLeft = startPoint.scrollLeft - dx;
      const scrollTop = startPoint.scrollTop - dy;

      scrollLeftEl.scrollLeft = scrollLeft;
      scrollTopEl.scrollTop = scrollTop;
    },
    [scrollLeftEl, scrollTopEl, startPoint],
  );

  const handleMouseUp = useCallback(() => {
    if (!startPoint) return;

    setStartPoint(null);
  }, [startPoint]);

  return (
    <Box
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      sx={{
        bottom: 0,
        cursor: !!startPoint ? 'grabbing' : 'grab',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
      }}
    />
  );
});

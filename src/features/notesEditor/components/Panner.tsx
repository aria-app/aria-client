import styled from '@emotion/styled';
import { memo, useCallback, useState } from 'react';

interface RootProps {
  isPanning: boolean;
}

const Root = styled.div<RootProps>(({ isPanning }) => ({
  bottom: 0,
  cursor: isPanning ? 'grabbing' : 'grab',
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
}));

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

function Panner(props: PannerProps) {
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
    <Root
      isPanning={!!startPoint}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}

export default memo(Panner);

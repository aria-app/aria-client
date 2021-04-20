import styled from '@emotion/styled';
import React from 'react';

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

// Panner.propTypes = {
//   scrollLeftEl: PropTypes.object,
//   scrollTopEl: PropTypes.object,
// };

type PannerStartPoint = {
  scrollLeft: number;
  scrollTop: number;
  x: number;
  y: number;
} | null;

function Panner(props: any) {
  const { scrollLeftEl, scrollTopEl } = props;
  const [startPoint, setStartPoint] = React.useState<PannerStartPoint>(null);

  const handleMouseDown = React.useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      setStartPoint({
        scrollLeft: scrollLeftEl.scrollLeft,
        scrollTop: scrollTopEl.scrollTop,
        x: e.pageX,
        y: e.pageY,
      });
    },
    [scrollLeftEl.scrollLeft, scrollTopEl.scrollTop],
  );

  const handleMouseLeave = React.useCallback(() => {
    if (!startPoint) return;

    setStartPoint(null);
  }, [startPoint]);

  const handleMouseMove = React.useCallback(
    (e) => {
      if (!startPoint) return;

      const dx = e.pageX - startPoint.x;
      const dy = e.pageY - startPoint.y;
      const scrollLeft = startPoint.scrollLeft - dx;
      const scrollTop = startPoint.scrollTop - dy;

      scrollLeftEl.scrollLeft = scrollLeft;
      scrollTopEl.scrollTop = scrollTop;
    },
    [scrollLeftEl, scrollTopEl, startPoint],
  );

  const handleMouseUp = React.useCallback(() => {
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

export default React.memo(Panner);

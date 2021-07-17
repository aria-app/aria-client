import { absoluteFill, Box } from 'aria-ui';
import isEqual from 'lodash/fp/isEqual';
import { FC, memo, useCallback, useRef, useState } from 'react';
import { DraggableCore, DraggableEventHandler } from 'react-draggable';

import { Point } from '../../../types';
import { Fence } from './Fence';

export interface SelectorProps {
  isEnabled: boolean;
  onSelectInArea: (
    startPoint: Point,
    endPoint: Point,
    isAdditive: boolean,
  ) => void;
  scrollLeftEl: HTMLElement | null;
  scrollTopEl: HTMLElement | null;
}

export const Selector: FC<SelectorProps> = memo((props) => {
  const { isEnabled, onSelectInArea, scrollLeftEl, scrollTopEl } = props;
  const nodeRef = useRef<HTMLDivElement>(null);
  const [endPoint, setEndPoint] = useState<Point>();
  const [startPoint, setStartPoint] = useState<Point>();

  const handleDrag: DraggableEventHandler = (e, dragData) => {
    const { pageX, pageY } = e as MouseEvent;
    const shouldScrollDown =
      window.innerHeight - pageY < 80 + 128 && dragData.deltaY >= 0;
    const shouldScrollLeft = pageX < 80 && dragData.deltaX <= 0;
    const shouldScrollRight =
      window.innerWidth - pageX < 80 && dragData.deltaX >= 0;
    const shouldScrollUp = pageY < 80 && dragData.deltaY <= 0;

    if (shouldScrollDown && scrollTopEl) {
      scrollTopEl.scrollTop = scrollTopEl.scrollTop + 20;
    }

    if (shouldScrollLeft && scrollLeftEl) {
      scrollLeftEl.scrollLeft = scrollLeftEl.scrollLeft - 20;
    }

    if (shouldScrollRight && scrollLeftEl) {
      scrollLeftEl.scrollLeft = scrollLeftEl.scrollLeft + 20;
    }

    if (shouldScrollUp && scrollTopEl) {
      scrollTopEl.scrollTop = scrollTopEl.scrollTop - 20;
    }

    const newEndPoint = dragDataToGridPoint(dragData);

    if (isEqual(newEndPoint, endPoint)) return;

    setEndPoint(newEndPoint);
  };

  const handleDragStart = useCallback((e, dragData) => {
    setStartPoint(dragDataToGridPoint(dragData));
  }, []);

  const handleDragStop = useCallback(
    (e) => {
      if (!startPoint) return;

      onSelectInArea(
        startPoint,
        endPoint || startPoint,
        e.ctrlKey || e.metaKey,
      );

      setEndPoint(undefined);
      setStartPoint(undefined);
    },
    [endPoint, onSelectInArea, startPoint],
  );

  return (
    <DraggableCore
      grid={[40, 40]}
      nodeRef={nodeRef}
      onDrag={handleDrag}
      onStart={handleDragStart}
      onStop={handleDragStop}
    >
      <Box
        ref={nodeRef}
        style={{ pointerEvents: isEnabled ? 'all' : 'none' }}
        sx={absoluteFill}
      >
        <Fence endPoint={endPoint} startPoint={startPoint} />
      </Box>
    </DraggableCore>
  );
});

function dragDataToGridPoint(dragData) {
  return {
    x: Math.floor(dragData.x / 40),
    y: Math.floor(dragData.y / 40),
  };
}

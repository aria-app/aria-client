import { absoluteFill, Box } from 'aria-ui';
import compose from 'lodash/fp/compose';
import first from 'lodash/fp/first';
import noop from 'lodash/fp/noop';
import split from 'lodash/fp/split';
import { FC, memo, useCallback, useMemo, useRef, useState } from 'react';

import { Point } from '../../../types';
import { NotesNote } from './NotesNote';

export interface DrawLayerProps {
  mousePoint: Point;
  onDraw: (mousePoint: Point) => void;
}

export const DrawLayer: FC<DrawLayerProps> = memo((props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { mousePoint, onDraw } = props;
  const [isDrawing, setIsDrawing] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const ghostNote = useMemo(
    () => ({
      __typename: 'Note',
      id: -1,
      points: [
        {
          x: mousePoint ? mousePoint.x : 0,
          y: mousePoint ? mousePoint.y : 0,
        },
        {
          x: mousePoint ? mousePoint.x + 1 : 0,
          y: mousePoint ? mousePoint.y : 0,
        },
      ],
      sequence: {
        __typename: 'Sequence',
        id: -1,
      },
    }),
    [mousePoint],
  );

  const handleMouseDown = useCallback(() => {
    setIsDrawing(true);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsMouseOver(true);
  }, []);

  const handleMouseLeave = useCallback(
    (e) => {
      setIsMouseOver(false);

      if (!isDrawing) return;

      const primaryClassName = `.${compose(
        first,
        split(' '),
      )(e.target.className)}`;
      const isDescendant = !!ref?.current?.querySelector(primaryClassName);

      if (isDescendant) return;

      setIsDrawing(false);
    },
    [isDrawing],
  );

  const handleMouseUp = useCallback(() => {
    if (!isDrawing) return;

    onDraw(mousePoint);

    setIsDrawing(false);
  }, [isDrawing, mousePoint, onDraw]);

  return (
    <Box
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      ref={ref}
      sx={absoluteFill}
    >
      {isMouseOver && (
        <NotesNote
          note={ghostNote}
          onDrag={noop}
          onDragStart={noop}
          onDragStop={noop}
          onEndPointDrag={noop}
          onEndPointDragStart={noop}
          onEndPointDragStop={noop}
          sx={{
            opacity: 0.4,
            pointerEvents: 'none',
          }}
        />
      )}
    </Box>
  );
});

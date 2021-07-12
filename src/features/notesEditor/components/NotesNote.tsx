import { Box, BoxProps, mergeSX } from 'aria-ui';
import first from 'lodash/fp/first';
import last from 'lodash/fp/last';
import {
  FC,
  HTMLAttributes,
  memo,
  MouseEvent,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';

import { Note, Point } from '../../../types';
import { PositionBounds, SizeBounds } from '../types';

export type NotesNoteDragStartHandler = (
  note: Note,
  e: MouseEvent<HTMLDivElement>,
) => void;

export type NotesNoteDragHandler = (dragDelta: Partial<Point>) => void;

export interface NotesNoteProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    'onDrag' | 'onDragStart' | 'onDragStop'
  > {
  isSelected?: boolean;
  note: Note;
  onDrag: NotesNoteDragHandler;
  onDragStart: NotesNoteDragStartHandler;
  onDragStop: DraggableEventHandler;
  onEndPointDrag: NotesNoteDragHandler;
  onEndPointDragStart: NotesNoteDragStartHandler;
  onEndPointDragStop: DraggableEventHandler;
  positionBounds?: PositionBounds;
  sizeBounds?: SizeBounds;
  sx?: BoxProps<any>['sx'];
}

export const NotesNote: FC<NotesNoteProps> = memo((props) => {
  const {
    isSelected,
    note,
    onDrag,
    onDragStart,
    onDragStop,
    onEndPointDrag,
    onEndPointDragStart,
    onEndPointDragStop,
    positionBounds,
    sizeBounds,
    sx,
    ...rest
  } = props;
  const endPointNodeRef = useRef<HTMLDivElement>(null);
  const startPointNodeRef = useRef<HTMLDivElement>(null);

  const connectorStyle = useMemo(() => {
    const startPoint = first(note.points);
    const endPoint = last(note.points);

    if (!endPoint || !startPoint) {
      return {};
    }

    const { asin, abs, PI, sign, sqrt } = Math;
    const x = (endPoint.x - startPoint.x) * 40;
    const y = (endPoint.y - startPoint.y) * 40;
    const scale = x !== 0 ? sqrt(abs(x ** 2 + y ** 2)) : 0;
    const rotation = x !== 0 ? asin(abs(y / scale)) * (180 / PI) * sign(y) : 0;

    return {
      transform: `rotate(${rotation}deg) scaleX(${scale})`,
    };
  }, [note.points]);

  const endPointStyle = useMemo(() => {
    const startPoint = first(note.points);
    const endPoint = last(note.points);

    if (!endPoint || !startPoint) {
      return {};
    }

    const x = (endPoint.x - startPoint.x) * 40;
    const y = (endPoint.y - startPoint.y) * 40;

    return {
      display: is32ndNote(note) ? 'none' : 'flex',
      transform: `translate(${x}px, ${y}px)`,
    };
  }, [note]);

  const handleDrag = useCallback(
    (e, { deltaX, deltaY }) => {
      onDrag({ x: Math.round(deltaX / 40), y: Math.round(deltaY / 40) });
    },
    [onDrag],
  );

  const handleDragStart = useCallback(
    (e) => {
      onDragStart(note, e);
    },
    [note, onDragStart],
  );

  const handleEndPointDrag = useCallback(
    (e, { deltaX }) => {
      onEndPointDrag({ x: Math.round(deltaX / 40) });
    },
    [onEndPointDrag],
  );

  const handleEndPointDragStart = useCallback(
    (e) => {
      onEndPointDragStart(note, e);
    },
    [note, onEndPointDragStart],
  );

  return (
    <Draggable
      bounds={positionBounds}
      enableUserSelectHack={true}
      grid={[40, 40]}
      handle=".start-point"
      nodeRef={startPointNodeRef}
      onDrag={handleDrag}
      onStart={handleDragStart}
      onStop={onDragStop}
      position={{
        x: note.points[0].x * 40,
        y: note.points[0].y * 40,
      }}
    >
      <Box
        ref={startPointNodeRef}
        sx={mergeSX(
          {
            left: 0,
            pointerEvents: 'none',
            position: 'absolute',
            top: 0,
            transition: 'transform 0.1s ease',
            zIndex: isSelected ? 2 : 1,
          },
          sx,
        )}
        {...rest}
      >
        <Box
          className="start-point"
          sx={{
            alignItems: 'center',
            display: 'flex',
            flex: '0 0 auto',
            height: 40,
            justifyContent: 'center',
            left: 0,
            overflow: 'hidden',
            pointerEvents: 'all',
            position: 'absolute',
            top: 0,
            transition: 'transform 0.1s ease',
            width: 40,
            zIndex: 2,
          }}
        >
          <Box
            backgroundColor={isSelected ? 'brandPrimary' : 'brandSubtle'}
            borderRadius="md"
            sx={{
              height: 24,
              width: 24,
              '&:hover': {
                transform: 'scale(1.05)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
          />
        </Box>
        <Box
          backgroundColor={isSelected ? 'brandPrimary' : 'brandSubtle'}
          style={connectorStyle}
          sx={{
            height: 10,
            left: 20,
            position: 'absolute',
            top: 15,
            transformOrigin: 'left center',
            transition: 'transform 0.1s ease',
            width: 1,
            zIndex: 1,
          }}
        />
        <Draggable
          axis="x"
          bounds={sizeBounds}
          grid={[40, 40]}
          nodeRef={endPointNodeRef}
          onDrag={handleEndPointDrag}
          onStart={handleEndPointDragStart}
          onStop={onEndPointDragStop}
          position={{
            x: (note.points[1].x - note.points[0].x) * 40,
            y: (note.points[1].y - note.points[0].y) * 40,
          }}
        >
          <Box
            ref={endPointNodeRef}
            style={endPointStyle}
            sx={{
              alignItems: 'center',
              display: 'flex',
              flex: '0 0 auto',
              height: 40,
              justifyContent: 'center',
              left: 0,
              overflow: 'hidden',
              pointerEvents: 'all',
              position: 'absolute',
              top: 0,
              transition: 'transform 0.1s ease',
              width: 40,
              zIndex: 2,
            }}
          >
            <Box
              backgroundColor={isSelected ? 'brandPrimary' : 'brandSubtle'}
              borderRadius="md"
              sx={{
                height: 24,
                width: 24,
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  transform: 'scale(0.95)',
                },
              }}
            />
          </Box>
        </Draggable>
      </Box>
    </Draggable>
  );
});

function is32ndNote(note: Note): boolean {
  const startPoint = first(note.points);
  const endPoint = last(note.points);

  if (!endPoint || !startPoint) {
    return false;
  }

  const length = endPoint.x - startPoint.x;
  return length === 0;
}

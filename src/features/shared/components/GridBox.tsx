import { Box } from 'aria-ui';
import clamp from 'lodash/fp/clamp';
import {
  FC,
  HTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Draggable from 'react-draggable';

export interface GridBoxContentComponentProps {
  id: number;
  isDragging: boolean;
  isResizing: boolean;
  length: number;
  step: number;
  x: number;
}

export type GridBoxOnLengthChange = (id: number, changedLength: number) => void;

export type GridBoxOnXChange = (id: number, changedX: number) => void;

export interface GridBoxProps extends HTMLAttributes<HTMLDivElement> {
  contentComponent?: FC<GridBoxContentComponentProps>;
  itemId: number;
  length: number;
  onLengthChange: GridBoxOnLengthChange;
  onXChange: GridBoxOnXChange;
  step?: number;
  totalLength: number;
  x: number;
}

export const GridBox: FC<GridBoxProps> = memo((props) => {
  const {
    contentComponent: ContentComponent = () => null,
    itemId,
    length: lengthProp,
    onLengthChange,
    onXChange,
    step = 100,
    totalLength,
    x,
  } = props;

  const rootNodeRef = useRef<HTMLDivElement>(null);
  const resizerNodeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [length, setLength] = useState(lengthProp);
  const cursor = useMemo(() => {
    if (isDragging) {
      return 'move';
    }

    if (isResizing) {
      return 'col-resize';
    }

    return 'initial';
  }, [isDragging, isResizing]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragStop = useCallback(
    (e, dragData) => {
      setIsDragging(false);

      const newX = Math.round(dragData.lastX / step);

      if (newX === x) return;

      onXChange(itemId, newX);
    },
    [itemId, onXChange, step, x],
  );

  const handleResizerDrag = useCallback(
    (e, dragData) => {
      setLength(clamp(1, totalLength - x, dragData.lastX / step));
    },
    [x, step, totalLength],
  );

  const handleResizerDragStart = useCallback(() => {
    setIsResizing(true);
  }, []);

  const handleResizerDragStop = useCallback(() => {
    setIsResizing(false);

    const newLength = Math.max(1, Math.round(length));

    if (newLength === lengthProp) {
      setLength(lengthProp);
      return;
    }

    onLengthChange(itemId, newLength);

    setLength(lengthProp);
  }, [itemId, length, lengthProp, onLengthChange]);

  useEffect(() => {
    setLength(lengthProp);
  }, [lengthProp]);

  return (
    <Draggable
      axis="x"
      bounds="parent"
      cancel={'.resizer'}
      key={itemId}
      nodeRef={rootNodeRef}
      onStart={handleDragStart}
      onStop={handleDragStop}
      position={{ x: x * step, y: 0 }}
    >
      <Box
        ref={rootNodeRef}
        style={{ width: length * step }}
        sx={{
          cursor,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          label: 'GridBox',
          left: 0,
          position: 'absolute',
          top: 0,
          transition:
            isDragging || isResizing
              ? 'none'
              : 'transform 200ms ease, width 200ms ease',
          zIndex: isDragging || isResizing ? 2 : 1,
        }}
      >
        <ContentComponent
          id={itemId}
          isDragging={isDragging}
          isResizing={isResizing}
          length={length}
          step={step}
          x={x}
        />
        <Draggable
          axis="x"
          bounds={{
            bottom: undefined,
            left: step - 16,
            right: undefined,
            top: undefined,
          }}
          nodeRef={resizerNodeRef}
          onDrag={handleResizerDrag}
          onStart={handleResizerDragStart}
          onStop={handleResizerDragStop}
          position={{ x: lengthProp * step - 16, y: 0 }}
        >
          <Box
            className="resizer"
            ref={resizerNodeRef}
            sx={{
              backgroundColor: 'transparent',
              bottom: 0,
              cursor: isDragging ? 'move' : 'col-resize',
              left: 0,
              position: 'absolute',
              top: 0,
              zIndex: 2,
            }}
            width={4}
          />
        </Draggable>
      </Box>
    </Draggable>
  );
});

GridBox.defaultProps = {
  step: 100,
};

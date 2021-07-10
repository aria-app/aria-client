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

import { GridBoxItem } from '../types';

export interface GridBoxContentComponentProps<TItemPayload> {
  isDragging: boolean;
  isResizing: boolean;
  item: GridBoxItem<TItemPayload>;
  step: number;
}

export type GridBoxOnItemChange<TItemPayload> = (
  changedItem: GridBoxItem<TItemPayload>,
) => void;

export interface GridBoxProps<TItemPayload>
  extends HTMLAttributes<HTMLDivElement> {
  contentComponent?: FC<GridBoxContentComponentProps<TItemPayload>>;
  item: GridBoxItem<TItemPayload>;
  onItemChange: GridBoxOnItemChange<TItemPayload>;
  step?: number;
  totalLength: number;
}

export type GridBoxComponent<TItemPayload = any> = FC<
  GridBoxProps<TItemPayload>
>;

export const GridBox: GridBoxComponent = memo((props) => {
  const {
    contentComponent: ContentComponent = () => null,
    item,
    onItemChange,
    step = 100,
    style = {},
    totalLength,
  } = props;
  const rootNodeRef = useRef<HTMLDivElement>(null);
  const resizerNodeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [length, setLength] = useState(item.length);

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

      if (newX === item.x) return;

      onItemChange({
        ...item,
        x: newX,
      });
    },
    [item, onItemChange, step],
  );

  const handleResizerDrag = useCallback(
    (e, dragData) => {
      setLength(clamp(1, totalLength - item.x, dragData.lastX / step));
    },
    [item.x, step, totalLength],
  );

  const handleResizerDragStart = useCallback(() => {
    setIsResizing(true);
  }, []);

  const handleResizerDragStop = useCallback(() => {
    setIsResizing(false);

    const newLength = Math.max(1, Math.round(length));

    if (newLength === item.length) {
      setLength(item.length);
      return;
    }

    onItemChange({
      ...item,
      length: newLength,
    });

    setLength(item.length);
  }, [item, length, onItemChange]);

  useEffect(() => {
    setLength(item.length);
  }, [item]);

  return (
    <Draggable
      axis="x"
      bounds="parent"
      cancel={'.resizer'}
      key={item.id}
      nodeRef={rootNodeRef}
      onStart={handleDragStart}
      onStop={handleDragStop}
      position={{ x: item.x * step, y: 0 }}
    >
      <Box
        ref={rootNodeRef}
        style={{ width: length * step, ...style }}
        sx={{
          cursor,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
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
          isDragging={isDragging}
          isResizing={isResizing}
          item={item}
          step={step}
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
          position={{ x: item.length * step - 16, y: 0 }}
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

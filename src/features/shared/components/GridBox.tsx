import styled from '@emotion/styled/macro';
import clamp from 'lodash/fp/clamp';
import {
  ElementType,
  FC,
  HTMLAttributes,
  memo,
  useCallback,
  useState,
} from 'react';
import Draggable from 'react-draggable';

import { GridBoxItem } from '../types';

const Resizer = styled.div(({ theme }) => ({
  backgroundColor: 'transparent',
  bottom: '0',
  left: '0',
  position: 'absolute',
  top: '0',
  width: theme.space(2),
  zIndex: 2,
}));

interface RootProps {
  isDragging: boolean;
  isResizing: boolean;
}

const Root = styled.div<RootProps>(({ isDragging, isResizing }) => {
  const getCursor = () => {
    if (isDragging) {
      return 'move';
    }

    if (isResizing) {
      return 'col-resize';
    }

    return 'initial';
  };

  return {
    cursor: getCursor(),
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
    [Resizer as any]: {
      cursor: isDragging ? 'move' : 'col-resize',
    },
  };
});

export interface GridBoxProps extends HTMLAttributes<HTMLDivElement> {
  contentComponent?: ElementType;
  item: GridBoxItem;
  onItemChange: (changedItem: GridBoxItem) => void;
  step?: number;
  totalLength: number;
}

export const GridBox: FC<GridBoxProps> = memo((props) => {
  const {
    contentComponent: ContentComponent = () => null,
    item,
    onItemChange,
    step = 100,
    style = {},
    totalLength,
  } = props;
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [length, setLength] = useState(item.length);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragStop = useCallback(
    (e, dragData) => {
      setIsDragging(false);

      onItemChange({
        ...item,
        x: Math.round(dragData.lastX / 64),
      });
    },
    [item, onItemChange],
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
    const roundedLength = Math.max(1, Math.round(length));

    setIsResizing(false);

    onItemChange({
      ...item,
      length: roundedLength,
    });

    setLength(roundedLength);
  }, [item, length, onItemChange]);

  return (
    <Draggable
      axis="x"
      bounds="parent"
      cancel={'.resizer'}
      key={item.id}
      onStart={handleDragStart}
      onStop={handleDragStop}
      position={{ x: item.x * step, y: 0 }}
    >
      <Root
        isDragging={isDragging}
        isResizing={isResizing}
        style={{ width: length * step, ...style }}
      >
        <ContentComponent isDragging={isDragging} item={item} step={step} />
        <Draggable
          axis="x"
          bounds={{
            bottom: undefined,
            left: step - 16,
            right: undefined,
            top: undefined,
          }}
          onDrag={handleResizerDrag}
          onStart={handleResizerDragStart}
          onStop={handleResizerDragStop}
          position={{ x: item.length * step - 16, y: 0 }}
        >
          <Resizer className="resizer" />
        </Draggable>
      </Root>
    </Draggable>
  );
});

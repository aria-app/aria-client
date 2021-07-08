import { Box } from 'aria-ui';
import * as CSS from 'csstype';
import { ElementType, FC, memo, useCallback, useMemo } from 'react';

import { GridBoxItem } from '../types';
import { GridBox } from './GridBox';

export interface GridBoxesProps {
  boxContentComponent: ElementType;
  items: GridBoxItem[];
  length: number;
  onItemsChange: (changedItems: GridBoxItem[]) => void;
  step?: number;
  style: CSS.Properties<number | string>;
}

export const GridBoxes: FC<GridBoxesProps> = memo((props) => {
  const {
    boxContentComponent,
    items,
    length,
    onItemsChange,
    step = 100,
    style = {},
  } = props;

  const boxes = useMemo(
    () => items.filter((i) => i.x < length),
    [items, length],
  );

  const handleGridBoxItemChange = useCallback(
    (draggedItem) => {
      if (!onItemsChange) return;

      onItemsChange(
        items.map((item) => {
          if (item.id !== draggedItem.id) return item;

          return draggedItem;
        }),
      );
    },
    [items, onItemsChange],
  );

  return (
    <Box
      style={{ ...style, width: length * step }}
      sx={{
        position: 'relative',
      }}
    >
      {boxes.map((item) => (
        <GridBox
          contentComponent={boxContentComponent}
          item={item}
          key={item.id}
          onItemChange={handleGridBoxItemChange}
          step={step}
          totalLength={length}
        />
      ))}
    </Box>
  );
});

import { Box } from 'aria-ui';
import * as CSS from 'csstype';
import { FC, memo, useCallback, useMemo } from 'react';

import { GridBoxItem } from '../types';
import { GridBox, GridBoxContentComponentProps } from './GridBox';

export type GridBoxesOnItemsChange<TItemPayload> = (
  changedItems: GridBoxItem<TItemPayload>[],
) => void;

export interface GridBoxesProps<TItemPayload = any> {
  boxContentComponent: FC<GridBoxContentComponentProps<TItemPayload>>;
  items: GridBoxItem<TItemPayload>[];
  length: number;
  onItemsChange: GridBoxesOnItemsChange<TItemPayload>;
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

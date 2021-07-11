import { Box, BoxProps, mergeSX } from 'aria-ui';
import { FC, memo, useCallback, useMemo } from 'react';

import {
  GridBox,
  GridBoxContentComponentProps,
  GridBoxOnLengthChange,
  GridBoxOnXChange,
} from './GridBox';

export interface GridBoxesItem {
  id: number;
  length: number;
  x: number;
}

export type GridBoxesOnItemsChange = (changedItems: GridBoxesItem[]) => void;

export interface GridBoxesProps extends BoxProps<'div'> {
  boxContentComponent: FC<GridBoxContentComponentProps>;
  items: GridBoxesItem[];
  length: number;
  onItemsChange: GridBoxesOnItemsChange;
  step?: number;
}

export const GridBoxes: FC<GridBoxesProps> = memo((props) => {
  const {
    boxContentComponent,
    items,
    length,
    onItemsChange,
    step = 100,
    style = {},
    sx: sxProp,
  } = props;

  const boxes = useMemo(
    () => items.filter((i) => i.x < length),
    [items, length],
  );

  const sx = useMemo(
    () =>
      mergeSX(
        {
          label: 'GridBoxes',
          position: 'relative',
          zIndex: 0,
        },
        sxProp,
      ),
    [sxProp],
  );

  const handleGridBoxLengthChange = useCallback<GridBoxOnLengthChange>(
    (id, changedLength) => {
      if (!onItemsChange) return;

      onItemsChange(
        items.map((item) =>
          item.id === id ? { ...item, length: changedLength } : item,
        ),
      );
    },
    [items, onItemsChange],
  );

  const handleGridBoxXChange = useCallback<GridBoxOnXChange>(
    (id, changedX) => {
      if (!onItemsChange) return;

      onItemsChange(
        items.map((item) => (item.id === id ? { ...item, x: changedX } : item)),
      );
    },
    [items, onItemsChange],
  );

  return (
    <Box style={{ ...style, width: length * step }} sx={sx}>
      {boxes.map((item) => (
        <GridBox
          contentComponent={boxContentComponent}
          itemId={item.id}
          key={item.id}
          length={item.length}
          onLengthChange={handleGridBoxLengthChange}
          onXChange={handleGridBoxXChange}
          step={step}
          totalLength={length}
          x={item.x}
        />
      ))}
    </Box>
  );
});

import { Meta, Story } from '@storybook/react';
import { Box } from 'aria-ui';
import { FC, useCallback, useEffect } from 'react';
import { useMemo, useState } from 'react';

import { GridBoxContentComponentProps } from '../GridBox';
import {
  GridBoxes,
  GridBoxesItem,
  GridBoxesOnItemsChange,
  GridBoxesProps,
} from '../GridBoxes';

export default {
  component: GridBoxes,
  decorators: [
    (Story, { args }) => (
      <Box
        backgroundColor="backgroundContrast"
        height={10}
        sx={{
          display: 'flex',
          position: 'relative',
          width: args.length * (args.step || 150),
        }}
      >
        {Story()}
      </Box>
    ),
  ],
  title: 'Shared/GridBoxes',
  argTypes: {
    boxContentComponent: { control: false },
  },
} as Meta;

const BoxContentComponent: FC<GridBoxContentComponentProps> = ({
  isDragging,
  isResizing,
}) => {
  const sx = useMemo(
    () => ({
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      label: 'BoxContentComponent',
    }),
    [],
  );

  const text = useMemo(() => {
    if (isResizing) return 'Resizing';

    return isDragging ? 'Dragging' : 'Not Dragging';
  }, [isDragging, isResizing]);

  return (
    <Box
      backgroundColor="border"
      borderColor="textSecondary"
      borderRightWidth={2}
      borderWidth={0}
      grow
      sx={sx}
    >
      {text}
    </Box>
  );
};

export const Default: Story<GridBoxesProps> = (args) => <GridBoxes {...args} />;

Default.args = {
  boxContentComponent: BoxContentComponent,
  items: [
    {
      id: 0,
      length: 1,
      x: 0,
    },
    {
      id: 1,
      length: 1,
      x: 2,
    },
  ],
  length: 3,
  step: 150,
};

export const Stateful: Story<GridBoxesProps> = (args) => {
  const [items, setItems] = useState<GridBoxesItem[]>(args.items);

  const handleItemsChange = useCallback<GridBoxesOnItemsChange>(
    (newItems) => {
      args.onItemsChange?.(newItems);
      setItems(newItems);
    },
    [args, setItems],
  );

  useEffect(() => {
    setItems(args.items);
  }, [args.items, setItems]);

  return (
    <GridBoxes {...args} items={items} onItemsChange={handleItemsChange} />
  );
};

Stateful.args = {
  ...Default.args,
};

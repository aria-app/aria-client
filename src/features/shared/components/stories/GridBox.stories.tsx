import { Meta, Story } from '@storybook/react';
import { Box, Text } from 'aria-ui';
import { FC, useCallback, useEffect } from 'react';
import { useMemo, useState } from 'react';

import { GridBoxItem } from '../../types';
import {
  GridBox,
  GridBoxContentComponentProps,
  GridBoxOnItemChange,
  GridBoxProps,
} from '../GridBox';

export default {
  component: GridBox,
  title: 'GridBox',
  argTypes: {
    contentComponent: { control: false },
  },
} as Meta;

const ContentComponent: FC<GridBoxContentComponentProps<any>> = ({
  isDragging,
  isResizing,
}) => {
  const text = useMemo(() => {
    if (isResizing) return 'Resizing';

    return isDragging ? 'Dragging' : 'Not Dragging';
  }, [isDragging, isResizing]);

  return (
    <Box
      backgroundColor="border"
      grow
      sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}
    >
      <Text block>{text}</Text>
    </Box>
  );
};

export const Default: Story<GridBoxProps<any>> = (args) => (
  <Box
    backgroundColor="backgroundContrast"
    height={10}
    sx={{ position: 'relative', width: args.totalLength }}
  >
    <GridBox {...args} />
  </Box>
);

Default.args = {
  contentComponent: ContentComponent,
  item: {
    id: 0,
    length: 1,
    payload: 'Sample payload',
    x: 1,
  },
  step: 150,
  totalLength: 450,
};

export const Stateful: Story<GridBoxProps<any>> = (args) => {
  const [item, setItem] = useState<GridBoxItem<any>>(args.item);

  const handleItemChange = useCallback<GridBoxOnItemChange<any>>(
    (newItem) => {
      args.onItemChange?.(newItem);
      setItem(newItem);
    },
    [args, setItem],
  );

  useEffect(() => {
    setItem(args.item);
  }, [args.item, setItem]);

  return (
    <Box
      backgroundColor="backgroundContrast"
      height={10}
      sx={{ position: 'relative', width: args.totalLength }}
    >
      <GridBox {...args} item={item} onItemChange={handleItemChange} />
    </Box>
  );
};

Stateful.args = {
  ...Default.args,
};

import { Meta, Story } from '@storybook/react';
import { Box } from 'aria-ui';
import { FC, useCallback, useEffect } from 'react';
import { useMemo, useState } from 'react';

import {
  GridBox,
  GridBoxContentComponentProps,
  GridBoxOnLengthChange,
  GridBoxOnXChange,
  GridBoxProps,
} from '../GridBox';

export default {
  component: GridBox,
  decorators: [
    (Story, { args }) => (
      <Box
        backgroundColor="backgroundContrast"
        height={10}
        sx={{ position: 'relative', width: args.totalLength }}
      >
        {Story()}
      </Box>
    ),
  ],
  title: 'GridBox',
  argTypes: {
    contentComponent: { control: false },
  },
} as Meta;

const ContentComponent: FC<GridBoxContentComponentProps> = ({
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
      {text}
    </Box>
  );
};

export const Default: Story<GridBoxProps> = (args) => <GridBox {...args} />;

Default.args = {
  contentComponent: ContentComponent,
  itemId: 0,
  length: 1,
  step: 150,
  totalLength: 450,
  x: 1,
};

export const Stateful: Story<GridBoxProps> = (args) => {
  const [length, setLength] = useState<number>(args.length);
  const [x, setX] = useState<number>(args.x);

  const handleLengthChange = useCallback<GridBoxOnLengthChange>(
    (id, changedLength) => {
      args.onLengthChange?.(id, changedLength);
      setLength(changedLength);
    },
    [args, setLength],
  );

  const handleXChange = useCallback<GridBoxOnXChange>(
    (id, changedX) => {
      args.onXChange?.(id, changedX);
      setX(changedX);
    },
    [args, setX],
  );

  useEffect(() => {
    setLength(args.length);
    setX(args.x);
  }, [args.length, args.x, setLength]);

  return (
    <GridBox
      {...args}
      length={length}
      onLengthChange={handleLengthChange}
      onXChange={handleXChange}
      x={x}
    />
  );
};

Stateful.args = {
  ...Default.args,
};

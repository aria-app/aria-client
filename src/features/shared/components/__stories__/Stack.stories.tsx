import filter from 'lodash/fp/filter';
import { ReactElement, useCallback, useState } from 'react';

import { dividerThicknesses } from '../../constants';
import { Box } from '../Box';
import { Button } from '../Button';
import Stack from '../Stack';

let id = 0;

export const Default = (args: Record<string, any>): ReactElement => (
  <Stack {...args}>
    <Box backgroundColor="primary">This is an item!!!</Box>
    <Box backgroundColor="warning">Item 2.</Box>
    <Box backgroundColor="success">Another Item...</Box>
  </Stack>
);

export function Animated(args: Record<string, any>): ReactElement {
  const [items, setItems] = useState<{ id: number; text: string }[]>([]);

  const handleAdd = useCallback(() => {
    setItems((items) => [...items, { id, text: `Item Number ${id}` }]);
    id += 1;
  }, []);

  const handleDelete = useCallback(({ id }) => {
    setItems((items) => filter((item) => item.id !== id, items));
  }, []);

  return (
    <Stack space={4}>
      <Button onClick={handleAdd} variant="contained">
        Add Item
      </Button>
      <Stack space={4} {...args}>
        {items.map((item) => (
          <Box
            key={item.id}
            onClick={() => handleDelete(item)}
            sx={{
              border: (theme) => `${theme.palette.primary.main} 2px solid`,
              padding: 2,
            }}
          >
            {item.text}
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}

Animated.args = {
  animate: true,
  space: 4,
};

Animated.parameters = {
  layout: 'padded',
};

export default {
  title: 'Stack',
  component: Stack,
  argTypes: {
    dividerThickness: {
      control: {
        type: 'inline-radio',
      },
      options: dividerThicknesses,
    },
    space: {
      name: 'space',
      control: {
        type: 'select',
      },
      options: [2, 4, 6, 8, 10, 12],
    },
  },
  args: {
    dividerThickness: 'thin',
    animate: false,
    showDividers: false,
    space: undefined,
  },
};

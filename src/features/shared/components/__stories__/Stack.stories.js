import filter from 'lodash/fp/filter';
import uniqueId from 'lodash/fp/uniqueId';
import React from 'react';

import {
  dividerThicknesses,
  spacingAliases,
  stackAlignments,
} from '../../constants';
import Box from '../Box';
import Button from '../Button';
import Stack from '../Stack';

export const Default = (args) => (
  <Stack {...args}>
    <Box backgroundColor="primary">This is an item!!!</Box>
    <Box backgroundColor="warning">Item 2.</Box>
    <Box backgroundColor="success">Another Item...</Box>
  </Stack>
);

export function Animated(args) {
  const [items, setItems] = React.useState([]);

  const handleAdd = React.useCallback(() => {
    const id = uniqueId();

    setItems((items) => [...items, { id, text: `Item Number ${id}` }]);
  }, []);

  const handleDelete = React.useCallback(({ id }) => {
    setItems((items) => filter((item) => item.id !== id, items));
  }, []);

  return (
    <Stack space={4}>
      <Button onClick={handleAdd} variant="contained">
        Add Item
      </Button>
      <Stack {...args}>
        {items.map((item) => (
          <Box
            borderColor="primary"
            borderWidth={2}
            key={item.id}
            onClick={() => handleDelete(item)}
            padding="medium"
          >
            {item.text}
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}

Animated.args = {
  isAnimated: true,
  itemProps: {
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    initial: { opacity: 0 },
  },
  space: 'medium',
};

Animated.parameters = {
  layout: 'padded',
};

export default {
  title: 'Stack',
  component: Stack,
  argTypes: {
    align: {
      control: {
        type: 'inline-radio',
        options: stackAlignments,
      },
    },
    dividerThickness: {
      control: {
        type: 'inline-radio',
        options: dividerThicknesses,
      },
    },
    space: {
      name: 'space',
      control: {
        type: 'select',
        options: [2.5, ...spacingAliases],
      },
    },
  },
  args: {
    align: 'stretch',
    dividerThickness: 'thin',
    isAnimated: false,
    showDividers: false,
    space: undefined,
  },
};

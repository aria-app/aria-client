import React from 'react';

import {
  dividerThicknesses,
  spacingAliases,
  stackAlignments,
} from '../../constants';
import Box from '../Box';
import Stack from '../Stack';

export const StackDefault = (args) => (
  <Stack {...args}>
    <Box backgroundColor="primary">This is an item!!!</Box>
    <Box backgroundColor="warning">Item 2.</Box>
    <Box backgroundColor="success">Another Item...</Box>
  </Stack>
);

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
    showDividers: false,
    space: undefined,
  },
};

import React from 'react';

import {
  dividerThicknesses,
  spacingAliases,
  stackAlignments,
} from '../../constants';
import Stack from '../Stack';

export const StackDefault = (args) => <Stack {...args} />;

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
    dividerThicknesses: {
      control: {
        type: 'inline-radio',
        options: dividerThicknesses,
      },
    },
    space: {
      control: {
        type: 'select',
        options: [2.5, ...spacingAliases],
      },
    },
  },
  args: {
    align: 'stretch',
    showDividers: false,
    space: '',
  },
};

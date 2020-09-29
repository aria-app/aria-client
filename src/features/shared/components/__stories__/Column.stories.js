import React from 'react';

import { columnWidths } from '../../constants';
import Column from '../Column';

export const ColumnDefault = (args) => <Column {...args}>Some Content</Column>;

export default {
  title: 'Column',
  component: Column,
  argTypes: {
    width: {
      control: {
        type: 'select',
        options: columnWidths,
      },
    },
  },
  args: {
    width: 'fluid',
  },
};

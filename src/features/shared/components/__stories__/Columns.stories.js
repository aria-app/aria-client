import React from 'react';

import {
  columnWidths,
  spacingAliases,
  verticalAlignments,
} from '../../constants';
import Box from '../Box';
import Column from '../Column';
import Columns from '../Columns';

export const ColumnsDefault = ({ firstColumnWidth, ...rest }) => (
  <Columns {...rest}>
    <Column width={firstColumnWidth}>
      <Box backgroundColor="subtle" padding="small" style={{ flexGrow: 1 }}>
        {firstColumnWidth}
      </Box>
    </Column>
    <Column width="fluid">
      <Box backgroundColor="subtle" padding="medium" style={{ flexGrow: 1 }}>
        fluid
      </Box>
    </Column>
  </Columns>
);

export default {
  title: 'Columns',
  component: Columns,
  argTypes: {
    alignY: {
      control: {
        type: 'inline-radio',
        options: verticalAlignments,
      },
    },
    firstColumnWidth: {
      name: 'First Column width',
      control: {
        type: 'select',
        options: columnWidths,
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
    alignY: 'top',
    firstColumnWidth: 'fluid',
    isReversed: false,
    space: 'medium',
  },
  parameters: { layout: 'padded' },
};

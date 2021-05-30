import range from 'lodash/fp/range';
import { ReactElement } from 'react';

import { verticalAlignments } from '../../constants';
import { Box } from '../Box';
import { Inline } from '../Inline';

export const InlineDefault = (args: Record<string, string>): ReactElement => (
  <div style={{ maxWidth: 320 }}>
    <Inline {...args}>
      {range(0, 10).map((n) => (
        <Box
          backgroundColor="subtle"
          key={n}
          padding={n % 2 === 0 ? 'small' : 'medium'}
        >
          {n}
        </Box>
      ))}
    </Inline>
  </div>
);

export default {
  title: 'Inline',
  component: Inline,
  argTypes: {
    align: {
      control: {
        type: 'inline-radio',
      },
      options: ['center', 'left', 'right'],
    },
    alignY: {
      control: {
        type: 'inline-radio',
      },
      options: verticalAlignments,
    },
    space: {
      control: {
        type: 'select',
      },
      options: [2, 4, 6, 8, 10, 12],
    },
  },
  args: {
    align: 'left',
    alignY: 'stretch',
    space: 'none',
  },
};

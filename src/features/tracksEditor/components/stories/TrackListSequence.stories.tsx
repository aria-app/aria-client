import { Meta, Story } from '@storybook/react';
import { Box } from 'aria-ui';

import {
  TrackListSequence,
  TrackListSequenceProps,
} from '../TrackListSequence';

const sequence = {
  __typename: 'Sequence',
  id: 1,
  measureCount: 1,
  notes: [
    {
      __typename: 'Note',
      id: 1,
      points: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ],
      sequence: {
        __typename: 'Sequence',
        id: 1,
      },
    },
    {
      __typename: 'Note',
      id: 2,
      points: [
        { x: 2, y: 2 },
        { x: 3, y: 2 },
      ],
      sequence: {
        __typename: 'Sequence',
        id: 1,
      },
    },
  ],
  position: 0,
  track: {
    id: 1,
  },
};

export default {
  component: TrackListSequence,
  title: 'TracksEditor/TrackListSequence',
} as Meta;

export const Default: Story<TrackListSequenceProps> = (args) => (
  <Box width={(args.sequence?.measureCount || 1) * 16}>
    <TrackListSequence {...args} />
  </Box>
);

Default.args = {
  isSelected: false,
  sequence,
};

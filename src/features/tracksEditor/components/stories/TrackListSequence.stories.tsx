import { Meta, Story } from '@storybook/react';
import { Box } from 'aria-ui';

import {
  TrackListSequence,
  TrackListSequenceProps,
} from '../TrackListSequence';

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
  sequence: {
    id: 1,
    measureCount: 1,
    notes: [
      {
        id: 1,
        points: [
          { x: 2, y: 32 },
          { x: 6, y: 32 },
        ],
        sequence: {
          id: 1,
        },
      },
    ],
    position: 0,
    track: {
      id: 1,
    },
  },
};

import { Meta, Story } from '@storybook/react';
import { Box } from 'aria-ui';

import {
  TrackSequenceNote,
  TrackSequenceNoteProps,
} from '../TrackSequenceNote';

export default {
  component: TrackSequenceNote,
  title: 'TracksEditor/TrackSequenceNote',
} as Meta;

export const Default: Story<TrackSequenceNoteProps> = (args) => (
  <Box backgroundColor="brandSubtle" size={16} sx={{ position: 'relative' }}>
    <TrackSequenceNote {...args} />
  </Box>
);

Default.args = {
  isSequenceSelected: false,
  note: {
    id: 1,
    points: [
      { x: 2, y: 32 },
      { x: 6, y: 32 },
    ],
    sequence: {
      id: 1,
    },
  },
};

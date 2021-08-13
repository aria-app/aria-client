import { Meta, Story } from '@storybook/react';
import { Box } from 'aria-ui';

import {
  TrackSequenceNote,
  TrackSequenceNoteProps,
} from '../TrackSequenceNote';

const note = {
  __typename: 'Note',
  id: 1,
  points: [
    { x: 2, y: 32 },
    { x: 6, y: 32 },
  ],
  sequence: {
    __typename: 'Sequence',
    id: 1,
  },
};

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
  note,
};

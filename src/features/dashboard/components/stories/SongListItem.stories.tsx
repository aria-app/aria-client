import { Meta, Story } from '@storybook/react';
import { Box } from 'aria-ui';

import { SongListItem, SongListItemProps } from '../SongListItem';

export default {
  component: SongListItem,
  decorators: [
    (Story) => <Box sx={{ maxWidth: 600, width: '100vh' }}>{Story()}</Box>,
  ],
  title: 'SongListItem',
} as Meta;

export const Default: Story<SongListItemProps> = (args) => (
  <SongListItem {...args} />
);

Default.args = {
  song: {
    bpm: 100,
    createdAt: '2021-01-01',
    id: 1,
    measureCount: 4,
    name: 'Song 1',
    tracks: [],
    updatedAt: '2021-01-01',
    user: {
      id: 1,
    },
  },
};

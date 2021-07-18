import { Meta, Story } from '@storybook/react';
import { Box } from 'aria-ui';

import { SongList, SongListProps } from '../SongList';

export default {
  component: SongList,
  decorators: [
    (Story) => <Box sx={{ maxWidth: 600, width: '100vw' }}>{Story()}</Box>,
  ],
  title: 'Dashboard/SongList',
} as Meta;

export const Default: Story<SongListProps> = (args) => <SongList {...args} />;

Default.args = {
  songs: [
    {
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
    {
      bpm: 70,
      createdAt: '2021-02-02',
      id: 2,
      measureCount: 4,
      name: 'Song 2',
      tracks: [],
      updatedAt: '2021-02-02',
      user: {
        id: 1,
      },
    },
  ],
};

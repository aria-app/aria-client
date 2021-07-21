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
      id: 1,
      name: 'Song 1',
      updatedAt: '2021-01-01',
    },
    {
      id: 2,
      name: 'Song 2',
      updatedAt: '2021-02-02',
    },
  ],
};

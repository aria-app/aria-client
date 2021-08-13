import { Meta, Story } from '@storybook/react';
import { Box } from 'aria-ui';

import { songListSongs } from '../../../../fixtures';
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
  songs: songListSongs,
};

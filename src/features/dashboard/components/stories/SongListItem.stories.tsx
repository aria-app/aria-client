import { Meta, Story } from '@storybook/react';
import { Box } from 'aria-ui';

import { songListSongs } from '../../../../fixtures';
import { SongListItem, SongListItemProps } from '../SongListItem';

export default {
  component: SongListItem,
  decorators: [
    (Story) => <Box sx={{ maxWidth: 600, width: '100vw' }}>{Story()}</Box>,
  ],
  title: 'Dashboard/SongListItem',
} as Meta;

export const Default: Story<SongListItemProps> = (args) => (
  <SongListItem {...args} />
);

Default.args = {
  song: songListSongs[0],
};

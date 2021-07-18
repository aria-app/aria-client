import { Meta, Story } from '@storybook/react';

import { SongInfoDialog, SongInfoDialogProps } from '../SongInfoDialog';

export default {
  component: SongInfoDialog,
  title: 'SongEditor/SongInfoDialog',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story<SongInfoDialogProps> = (args) => (
  <SongInfoDialog {...args} />
);

Default.args = {
  isOpen: true,
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

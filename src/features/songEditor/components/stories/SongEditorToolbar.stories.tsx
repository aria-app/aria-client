import { Meta, Story } from '@storybook/react';

import {
  SongEditorToolbar,
  SongEditorToolbarProps,
} from '../SongEditorToolbar';

export default {
  component: SongEditorToolbar,
  title: 'SongEditor/SongEditorToolbar',
  argTypes: {
    onPause: { control: false },
    onPlay: { control: false },
    onSongInfoOpen: { control: false },
    onStop: { control: false },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story<SongEditorToolbarProps> = (args) => (
  <SongEditorToolbar {...args} />
);

Default.args = {
  playbackState: 'STOPPED',
};

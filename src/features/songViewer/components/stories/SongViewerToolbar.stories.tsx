import { Meta, Story } from '@storybook/react';

import {
  SongViewerToolbar,
  SongViewerToolbarProps,
} from '../SongViewerToolbar';

export default {
  component: SongViewerToolbar,
  title: 'SongViewer/SongViewerToolbar',
  argTypes: {
    onPause: { control: false },
    onPlay: { control: false },
    onStop: { control: false },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story<SongViewerToolbarProps> = (args) => (
  <SongViewerToolbar {...args} />
);

Default.args = {
  playbackState: 'STOPPED',
};

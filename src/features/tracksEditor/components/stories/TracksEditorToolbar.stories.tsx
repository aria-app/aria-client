import { Meta, Story } from '@storybook/react';

import {
  TracksEditorToolbar,
  TracksEditorToolbarProps,
} from '../TracksEditorToolbar';

export default {
  component: TracksEditorToolbar,
  title: 'TracksEditor/TracksEditorToolbar',
  argTypes: {
    onSequenceDelete: { control: false },
    onSequenceDuplicate: { control: false },
    onSequenceOpen: { control: false },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story<TracksEditorToolbarProps> = (args) => (
  <TracksEditorToolbar {...args} />
);

Default.args = {
  selectedSequence: undefined,
};

export const SelectedSequence: Story<TracksEditorToolbarProps> = (args) => (
  <TracksEditorToolbar {...args} />
);

SelectedSequence.args = {
  ...Default.args,
  selectedSequence: {
    id: 1,
    measureCount: 1,
    notes: [],
    position: 0,
    track: {
      id: 1,
    },
  },
};

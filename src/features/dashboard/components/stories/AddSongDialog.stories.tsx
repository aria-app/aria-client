import { Meta, Story } from '@storybook/react';

import { AddSongDialog, AddSongDialogProps } from '../AddSongDialog';

export default {
  component: AddSongDialog,
  title: 'Dashboard/AddSongDialog',
  argTypes: {
    onCancel: { control: false },
    onConfirm: { control: false },
  },
} as Meta;

export const Default: Story<AddSongDialogProps> = (args) => (
  <AddSongDialog {...args} />
);

Default.args = {
  isOpen: true,
};

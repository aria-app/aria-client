import { Meta, Story } from '@storybook/react';

import { AddTrackButton, AddTrackButtonProps } from '../AddTrackButton';

export default {
  component: AddTrackButton,
  title: 'TracksEditor/AddTrackButton',
} as Meta;

export const Default: Story<AddTrackButtonProps> = (args) => (
  <AddTrackButton {...args} />
);

Default.args = {};

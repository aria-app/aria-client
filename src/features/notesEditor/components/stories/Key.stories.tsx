import { Meta, Story } from '@storybook/react';

import { Key, KeyProps } from '../Key';

export default {
  component: Key,
  title: 'NotesEditor/Key',
} as Meta;

export const Default: Story<KeyProps> = (args) => <Key {...args} />;

Default.args = {
  isHoveredRow: false,
  step: 47,
  totalKeyCount: 1,
};

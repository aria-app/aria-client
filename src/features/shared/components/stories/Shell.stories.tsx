import { Meta, Story } from '@storybook/react';

import { Shell, ShellProps } from '../Shell';

export default {
  component: Shell,
  title: 'Shared/Shell',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story<ShellProps> = (args) => <Shell {...args} />;

Default.args = {
  children: 'Shell content',
};

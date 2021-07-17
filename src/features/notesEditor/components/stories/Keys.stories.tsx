import { Meta, Story } from '@storybook/react';

import { Keys, KeysProps } from '../Keys';

export default {
  component: Keys,
  title: 'NotesEditor/Keys',
} as Meta;

export const Default: Story<KeysProps> = (args) => <Keys {...args} />;

Default.args = {
  hoveredRow: 1,
  octaveCount: 1,
};

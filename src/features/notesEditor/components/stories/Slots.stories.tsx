import { Meta, Story } from '@storybook/react';

import { Slots, SlotsProps } from '../Slots';

export default {
  component: Slots,
  title: 'NotesEditor/Slots',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story<SlotsProps> = (args) => <Slots {...args} />;

Default.args = {
  measureCount: 1,
  octaveCount: 1,
};

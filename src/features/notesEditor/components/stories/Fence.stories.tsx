import { Meta, Story } from '@storybook/react';

import { Fence, FenceProps } from '../Fence';

export default {
  component: Fence,
  title: 'NotesEditor/Fence',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story<FenceProps> = (args) => <Fence {...args} />;

Default.args = {
  endPoint: {
    x: 6,
    y: 5,
  },
  startPoint: {
    x: 1,
    y: 1,
  },
};

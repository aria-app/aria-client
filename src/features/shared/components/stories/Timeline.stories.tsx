import { Meta, Story } from '@storybook/react';

import { Timeline, TimelineProps } from '../Timeline';

export default {
  component: Timeline,
  title: 'Shared/Timeline',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story<TimelineProps> = (args) => <Timeline {...args} />;

Default.args = {
  isVisible: true,
  offset: 100,
};

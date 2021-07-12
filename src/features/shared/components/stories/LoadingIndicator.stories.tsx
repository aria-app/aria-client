import { Meta, Story } from '@storybook/react';

import { LoadingIndicator, LoadingIndicatorProps } from '../LoadingIndicator';

export default {
  component: LoadingIndicator,
  title: 'Shared/LoadingIndicator',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story<LoadingIndicatorProps> = (args) => (
  <LoadingIndicator {...args} />
);

Default.args = {
  children: 'Loading...',
};

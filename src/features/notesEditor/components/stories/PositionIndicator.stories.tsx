import { Meta, Story } from '@storybook/react';

import {
  PositionIndicator,
  PositionIndicatorProps,
} from '../PositionIndicator';

export default {
  component: PositionIndicator,
  title: 'NotesEditor/PositionIndicator',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story<PositionIndicatorProps> = (args) => (
  <PositionIndicator {...args} />
);

Default.args = {
  mousePoint: {
    x: 1,
    y: 1,
  },
};

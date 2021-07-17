import { Meta, Story } from '@storybook/react';

import { DrawLayer, DrawLayerProps } from '../DrawLayer';

export default {
  component: DrawLayer,
  title: 'NotesEditor/DrawLayer',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story<DrawLayerProps> = (args) => <DrawLayer {...args} />;

Default.args = {
  mousePoint: {
    x: 1,
    y: 1,
  },
};

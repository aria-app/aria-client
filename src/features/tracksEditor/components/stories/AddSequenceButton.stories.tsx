import { Meta, Story } from '@storybook/react';
import { Box } from 'aria-ui';

import {
  AddSequenceButton,
  AddSequenceButtonProps,
} from '../AddSequenceButton';

export default {
  component: AddSequenceButton,
  title: 'TracksEditor/AddSequenceButton',
} as Meta;

export const Default: Story<AddSequenceButtonProps> = (args) => (
  <Box
    backgroundColor="backgroundContrast"
    borderRadius="md"
    height={16}
    sx={{ position: 'relative' }}
    width={64}
  >
    <AddSequenceButton {...args} />
  </Box>
);

Default.args = {
  position: 0,
};

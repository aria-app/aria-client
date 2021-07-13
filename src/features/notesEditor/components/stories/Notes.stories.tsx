import { Meta, Story } from '@storybook/react';
import { Box } from 'aria-ui';

import { toolTypes } from '../../constants';
import { Notes, NotesProps } from '../Notes';

export default {
  component: Notes,
  title: 'NotesEditor/Notes',
  decorators: [
    (Story, { args }) => (
      <Box
        backgroundColor="backgroundContrast"
        borderRadius="md"
        height={args.octaveCount * 12 * 10}
        sx={{ position: 'relative' }}
        width={args.measureCount * 4 * 8 * 10}
      >
        {Story()}
      </Box>
    ),
  ],
  argTypes: {
    toolType: {
      control: { type: 'inline-radio' },
      options: Object.keys(toolTypes),
    },
  },
} as Meta;

export const Default: Story<NotesProps> = (args) => <Notes {...args} />;

const notes = [
  {
    id: 1,
    points: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
    sequence: {
      id: 1,
    },
  },
  {
    id: 2,
    points: [
      { x: 2, y: 2 },
      { x: 3, y: 2 },
    ],
    sequence: {
      id: 1,
    },
  },
];

Default.args = {
  measureCount: 1,
  notes,
  octaveCount: 1,
  selectedNotes: [notes[0]],
  toolType: 'SELECT',
};

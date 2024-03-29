import { Meta, Story } from '@storybook/react';
import { Box } from 'aria-ui';
import { useState } from 'react';

import { Grid, GridProps } from '../Grid';

const notes = [
  {
    __typename: 'Note',
    id: 1,
    points: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
    sequence: {
      __typename: 'Sequence',
      id: 1,
    },
  },
  {
    __typename: 'Note',
    id: 2,
    points: [
      { x: 2, y: 2 },
      { x: 3, y: 2 },
    ],
    sequence: {
      __typename: 'Sequence',
      id: 1,
    },
  },
];

export default {
  component: Grid,
  title: 'NotesEditor/Grid',
  argTypes: {
    notesEditorContentEl: { control: false },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story<GridProps> = (args) => {
  const [notesEditorContentEl, setNotesEditorContentEl] =
    useState<HTMLElement | null>(null);

  return (
    <Box
      ref={setNotesEditorContentEl}
      sx={{
        display: 'flex',
        flex: '1 1 0',
        flexDirection: 'column',
        overflowX: 'hidden',
        overflowY: 'scroll',
      }}
    >
      <Box
        paddingY={14}
        sx={{
          display: 'flex',
          flex: '1 0 auto',
        }}
      >
        <Grid {...args} notesEditorContentEl={notesEditorContentEl} />
      </Box>
    </Box>
  );
};

Default.args = {
  measureCount: 1,
  mousePoint: {
    x: 1,
    y: 1,
  },
  notes,
  selectedNotes: [notes[0]],
  toolType: 'SELECT',
};

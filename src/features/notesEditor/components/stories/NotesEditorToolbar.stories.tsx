import { Meta, Story } from '@storybook/react';

import {
  NotesEditorToolbar,
  NotesEditorToolbarProps,
} from '../NotesEditorToolbar';

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
  component: NotesEditorToolbar,
  title: 'NotesEditor/NotesEditorToolbar',
  argTypes: {
    onClose: { control: false },
    onDelete: { control: false },
    onDeselectAll: { control: false },
    onDrawToolSelect: { control: false },
    onDuplicate: { control: false },
    onEraseToolSelect: { control: false },
    onOctaveDown: { control: false },
    onOctaveUp: { control: false },
    onPanToolSelect: { control: false },
    onSelectToolSelect: { control: false },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story<NotesEditorToolbarProps> = (args) => (
  <NotesEditorToolbar {...args} />
);

Default.args = {
  measureCount: 1,
  selectedNotes: [],
  toolType: 'DRAW',
};
export const SelectedNotes: Story<NotesEditorToolbarProps> = (args) => (
  <NotesEditorToolbar {...args} />
);

SelectedNotes.args = {
  ...Default.args,
  selectedNotes: notes,
};

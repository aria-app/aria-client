import { Meta, Story } from '@storybook/react';
import { Box } from 'aria-ui';
import { useCallback, useEffect, useState } from 'react';
import { DraggableEventHandler } from 'react-draggable';

import { Note, Point } from '../../../../types';
import { applyPositionDeltas, applySizeDeltas } from '../Notes';
import { NotesNote, NotesNoteOnDrag, NotesNoteProps } from '../NotesNote';

export default {
  component: NotesNote,
  decorators: [
    (Story, { args }) => (
      <Box
        backgroundColor="backgroundContrast"
        borderRadius="md"
        height={(args.positionBounds.bottom - args.positionBounds.top + 40) / 4}
        sx={{ alignItems: 'center', display: 'flex', position: 'relative' }}
        width={(args.positionBounds.right - args.positionBounds.left + 40) / 4}
      >
        {Story()}
      </Box>
    ),
  ],
  title: 'NotesEditor/NotesNote',
} as Meta;

export const Default: Story<NotesNoteProps> = (args) => <NotesNote {...args} />;

Default.args = {
  isSelected: false,
  note: {
    id: 1,
    points: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
    sequence: {
      id: 1,
    },
  },
  positionBounds: {
    bottom: 0,
    left: 0,
    right: 200,
    top: 0,
  },
  sizeBounds: {
    left: 0,
    right: 200,
  },
};
export const Stateful: Story<NotesNoteProps> = (args) => {
  const [positionDelta, setPositionDelta] = useState<Point>({ x: 0, y: 0 });
  const [sizeDelta, setSizeDelta] = useState<Point>({ x: 0, y: 0 });
  const [note, setNote] = useState<Note>(args.note);

  const handleDrag = useCallback<NotesNoteOnDrag>(
    (dragDelta) => {
      const { x = 0, y = 0 } = dragDelta;

      setPositionDelta({
        x: positionDelta.x + x,
        y: positionDelta.y + y,
      });

      args.onDrag(dragDelta);
    },
    [args, positionDelta.x, positionDelta.y],
  );

  const handleDragStop = useCallback<DraggableEventHandler>(
    (...callbackArgs) => {
      setNote(applyPositionDeltas([note], { [note.id]: positionDelta })[0]);
      setPositionDelta({ x: 0, y: 0 });
      args.onDragStop(...callbackArgs);
    },
    [args, note, positionDelta],
  );

  const handleEndPointDrag = useCallback<NotesNoteOnDrag>(
    (dragDelta) => {
      const { x = 0, y = 0 } = dragDelta;

      setSizeDelta({
        x: sizeDelta.x + x,
        y: sizeDelta.y + y,
      });

      args.onDrag(dragDelta);
    },
    [args, sizeDelta.x, sizeDelta.y],
  );

  const handleEndPointDragStop = useCallback<DraggableEventHandler>(
    (...callbackArgs) => {
      setNote(applySizeDeltas([note], { [note.id]: sizeDelta })[0]);
      setSizeDelta({ x: 0, y: 0 });
      args.onDragStop(...callbackArgs);
    },
    [args, note, sizeDelta],
  );

  useEffect(() => {
    setNote(args.note);
  }, [args.note]);

  return (
    <NotesNote
      {...args}
      note={note}
      onDrag={handleDrag}
      onDragStop={handleDragStop}
      onEndPointDrag={handleEndPointDrag}
      onEndPointDragStop={handleEndPointDragStop}
    />
  );
};

Stateful.args = {
  ...Default.args,
};

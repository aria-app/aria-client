import { Box, useThemeWithDefault } from 'aria-ui';
import getOr from 'lodash/fp/getOr';
import { FC, memo } from 'react';

import { Note } from '../../../types';

export interface TrackSequenceNoteProps {
  isSequenceSelected: boolean;
  note: Note;
}

export const TrackSequenceNote: FC<TrackSequenceNoteProps> = memo(
  (props: TrackSequenceNoteProps) => {
    const { isSequenceSelected, note } = props;
    const x0 = note.points[0].x;
    const x1 = note.points[1].x;
    const y0 = note.points[0].y * (64 / 84);
    const theme = useThemeWithDefault();

    return (
      <Box
        style={{
          transform: `translate(${x0 * 2}px, ${y0}px)`,
          width: (x1 - x0 + 1) * 2,
        }}
        sx={{
          backgroundColor: isSequenceSelected
            ? theme.getForegroundColor('brandPrimary')
            : theme.colors.brandContrast,
          height: 1,
          left: 2,
          position: 'absolute',
          top: 2,
        }}
      />
    );
  },
);

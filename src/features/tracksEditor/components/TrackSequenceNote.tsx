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
    const x0 = getOr(0, 'points[0].x', note);
    const x1 = getOr(0, 'points[1].x', note);
    const y0 = getOr(0, 'points[0].y', note) * (64 / 84);
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

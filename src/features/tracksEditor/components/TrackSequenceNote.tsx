import styled from '@emotion/styled';
import getOr from 'lodash/fp/getOr';
import { memo } from 'react';

import { Note } from '../../../types';

interface RootProps {
  isSequenceSelected: boolean;
}

const Root = styled.div<RootProps>(({ isSequenceSelected, theme }) => ({
  backgroundColor: isSequenceSelected
    ? theme.getForegroundColor('brandPrimary')
    : theme.colors.brandContrast,
  height: 1,
  left: 2,
  position: 'absolute',
  top: 2,
}));

export interface TrackSequenceNoteProps {
  isSequenceSelected: boolean;
  note: Note;
}

function TrackSequenceNote(props: TrackSequenceNoteProps) {
  const { isSequenceSelected, note } = props;
  const x0 = getOr(0, 'points[0].x', note);
  const x1 = getOr(0, 'points[1].x', note);
  const y0 = getOr(0, 'points[0].y', note) * (64 / 84);

  return (
    <Root
      isSequenceSelected={isSequenceSelected}
      style={{
        transform: `translate(${x0 * 2}px, ${y0}px)`,
        width: (x1 - x0 + 1) * 2,
      }}
    />
  );
}

export default memo(TrackSequenceNote);

import getOr from 'lodash/fp/getOr';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Root = styled.div(({ isSequenceSelected, theme }) => ({
  backgroundColor: isSequenceSelected
    ? theme.palette.primary.contrastText
    : theme.palette.primary.dark,
  height: 1,
  left: 2,
  position: 'absolute',
  top: 2,
}));

TrackSequenceNote.propTypes = {
  isSequenceSelected: PropTypes.bool,
  note: PropTypes.object,
};

function TrackSequenceNote(props) {
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

export default React.memo(TrackSequenceNote);

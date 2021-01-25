import styled from '@emotion/styled';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import showIf from 'react-render-helpers/showIf';

const Column = styled.div(({ theme }) => ({
  backgroundColor: transparentize(0.95, theme.palette.primary.main),
  borderRadius: theme.shape.borderRadius,
  bottom: 0,
  left: 0,
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
  width: 40,
}));

const Row = styled.div(({ theme }) => ({
  backgroundColor: transparentize(0.95, theme.palette.primary.main),
  borderRadius: theme.shape.borderRadius,
  left: 0,
  height: 40,
  pointerEvents: 'none',
  position: 'absolute',
  right: 0,
  top: 0,
}));

PositionIndicator.propTypes = {
  mousePoint: PropTypes.object,
};

function PositionIndicator(props) {
  const { mousePoint } = props;

  return (
    <React.Fragment>
      {showIf(mousePoint.x >= 0)(
        <Column
          style={{
            transform: `translateX(${mousePoint.x * 40}px)`,
          }}
        />,
      )}
      {showIf(mousePoint.y >= 0)(
        <Row
          style={{
            transform: `translateY(${mousePoint.y * 40}px)`,
          }}
        />,
      )}
    </React.Fragment>
  );
}

export default React.memo(PositionIndicator);

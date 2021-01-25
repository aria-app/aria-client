import styled from '@emotion/styled';
import isEmpty from 'lodash/fp/isEmpty';
import isEqual from 'lodash/fp/isEqual';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';

const Root = styled.div(({ theme }) => ({
  backgroundColor: transparentize(0.75, theme.palette.primary.main),
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: 2,
  left: 0,
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
}));

Fence.propTypes = {
  endPoint: PropTypes.object,
  startPoint: PropTypes.object,
};

function Fence(props) {
  const { endPoint, startPoint } = props;

  const display = React.useMemo(
    () =>
      !isEmpty(startPoint) && !isEqual(startPoint, endPoint) ? 'block' : 'none',
    [endPoint, startPoint],
  );

  const height = React.useMemo(() => {
    if (isEmpty(startPoint) || isEmpty(endPoint)) return 0;

    return (Math.abs(endPoint.y - startPoint.y) + 1) * 40;
  }, [endPoint, startPoint]);

  const transform = React.useMemo(() => {
    if (isEmpty(startPoint) || isEmpty(endPoint)) {
      return 'translate(0px, 0px)';
    }

    const x = Math.min(startPoint.x, endPoint.x) * 40;
    const y = Math.min(startPoint.y, endPoint.y) * 40;

    return `translate(${x}px, ${y}px)`;
  }, [endPoint, startPoint]);

  const width = React.useMemo(() => {
    if (isEmpty(startPoint) || isEmpty(endPoint)) return 0;

    return (Math.abs(endPoint.x - startPoint.x) + 1) * 40;
  }, [endPoint, startPoint]);

  return <Root style={{ display, height, transform, width }} />;
}

export default React.memo(Fence);

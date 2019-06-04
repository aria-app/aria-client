import { PropTypes } from 'prop-types';
import { transparentize } from 'polished';
import React from 'react';
import { showIf } from 'react-render-helpers';
import withStyles from '@material-ui/styles/withStyles';

const styles = theme => ({
  column: {
    backgroundColor: transparentize(0.95, theme.palette.primary.main),
    borderRadius: 2,
    bottom: 0,
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    width: 40,
  },
  row: {
    backgroundColor: transparentize(0.95, theme.palette.primary.main),
    borderRadius: 2,
    left: 0,
    height: 40,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

PositionIndicator.propTypes = {
  mousePoint: PropTypes.object,
};

function PositionIndicator(props) {
  return (
    <React.Fragment>
      {showIf(props.mousePoint.x >= 0)(
        <div
          className={props.classes.column}
          style={{
            transform: `translateX(${props.mousePoint.x * 40}px)`,
          }}
        />,
      )}
      {showIf(props.mousePoint.y >= 0)(
        <div
          className={props.classes.row}
          style={{
            transform: `translateY(${props.mousePoint.y * 40}px)`,
          }}
        />,
      )}
    </React.Fragment>
  );
}

export default React.memo(withStyles(styles)(PositionIndicator));

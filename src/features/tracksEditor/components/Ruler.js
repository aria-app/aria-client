import round from 'lodash/round';
import times from 'lodash/fp/times';
import withStyles from '@material-ui/styles/withStyles';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import RulerResizer from './RulerResizer';

const getStyles = theme => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
    flex: '0 0 auto',
    height: 36,
    marginBottom: theme.spacing(3),
    position: 'relative',
    '&::before': {
      backgroundColor: theme.palette.action.hover,
      bottom: 0,
      content: '""',
      display: 'block',
      height: 2,
      left: 0,
      position: 'absolute',
      right: 0,
    },
    '&::after': {
      backgroundColor: theme.palette.action.hover,
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
      bottom: 2,
      content: '""',
      display: 'block',
      height: 34,
      right: 0,
      position: 'absolute',
      width: 2,
    },
  },
  measureNumber: {
    color: transparentize(0.5, theme.palette.text.primary),
    fontSize: 10,
    fontWeight: 'bold',
    position: 'absolute',
    '&::after': {
      backgroundColor: theme.palette.action.hover,
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
      bottom: 0,
      content: '""',
      display: 'block',
      height: 34,
      left: -6,
      position: 'absolute',
      width: 2,
    },
  },
});

function Ruler(props) {
  const {
    classes,
    measureCount,
    measureWidth,
    onMeasureCountChange,
    onPositionSet,
  } = props;

  const handleClick = React.useCallback(
    e => {
      const measures = e.nativeEvent.offsetX / measureWidth;
      const notesPerMeasure = 32;

      onPositionSet(round(measures * notesPerMeasure));
    },
    [measureWidth, onPositionSet],
  );

  return (
    <div
      className={classes.root}
      onClick={handleClick}
      style={{ width: measureWidth * measureCount + 1 }}
    >
      {times(
        i => (
          <div
            className={classes.measureNumber}
            key={i}
            style={{
              left: i * 64 + 6,
              bottom: 2,
            }}
          >
            {i + 1}
          </div>
        ),
        measureCount,
      )}
      <RulerResizer onSizeChange={onMeasureCountChange} size={measureCount} />
    </div>
  );
}

Ruler.propTypes = {
  classes: PropTypes.object,
  measureCount: PropTypes.number,
  measureWidth: PropTypes.number,
  onMeasureCountChange: PropTypes.func,
  onPositionSet: PropTypes.func,
};

export default React.memo(withStyles(getStyles)(Ruler));

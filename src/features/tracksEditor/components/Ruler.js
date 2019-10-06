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
    height: 35,
    marginBottom: theme.spacing(2),
    position: 'relative',
  },
  measureNumber: {
    color: transparentize(0.5, theme.palette.text.primary),
    fontSize: 10,
    position: 'absolute',
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
              bottom: 0,
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

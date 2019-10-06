import Dawww from 'dawww';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import Key from './Key';

const styles = {
  root: {
    display: 'flex',
    flex: '0 0 auto',
    flexDirection: 'column',
    width: 40,
  },
};

const keyStyles = Dawww.SCALE.reduce((acc, currentStep) => {
  return {
    ...acc,
    [currentStep.y]: {
      borderBottomRightRadius:
        currentStep.y === Dawww.SCALE.length - 1 ? 4 : '',
      borderTopRightRadius: currentStep.y === 0 ? 4 : '',
    },
  };
}, {});

function Keys(props) {
  const { classes, hoveredRow, onKeyPress } = props;

  const getIsHoveredRow = React.useCallback(step => step.y === hoveredRow, [
    hoveredRow,
  ]);

  const handleKeyMouseDown = React.useCallback(
    step => {
      onKeyPress(step.y);
    },
    [onKeyPress],
  );

  return (
    <div className={classes.root}>
      {Dawww.SCALE.map(step => (
        <Key
          isHoveredRow={getIsHoveredRow(step)}
          key={step.y}
          onMouseDown={handleKeyMouseDown}
          step={step}
          style={keyStyles[step.y]}
        />
      ))}
    </div>
  );
}

Keys.propTypes = {
  classes: PropTypes.object,
  hoveredRow: PropTypes.number,
  onKeyPress: PropTypes.func,
};

export default React.memo(withStyles(styles)(Keys));

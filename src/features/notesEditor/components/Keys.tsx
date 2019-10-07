import Dawww from 'dawww';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import React from 'react';
import Key from './Key';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      border: `2px solid ${theme.palette.action.hover}`,
      borderBottomRightRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius,
      borderLeft: 0,
      display: 'flex',
      flex: '0 0 auto',
      flexDirection: 'column',
      width: 40,
    },
  });

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

export interface KeysProps extends WithStyles<typeof styles> {
  hoveredRow?: number;
  onKeyPress?: (pitch: number) => void;
}

function Keys(props: KeysProps) {
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

export default React.memo(withStyles(styles)(Keys));

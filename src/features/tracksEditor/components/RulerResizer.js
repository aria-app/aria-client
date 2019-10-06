import withStyles from '@material-ui/styles/withStyles';
import withTheme from '@material-ui/styles/withTheme';
import PropTypes from 'prop-types';
import React from 'react';
import Draggable from 'react-draggable';

const styles = theme => ({
  root: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    border: `2px solid ${theme.palette.text.hint}`,
    borderRadius: theme.shape.borderRadius,
    cursor: 'col-resize',
    height: 36,
    left: 0,
    position: 'absolute',
    top: 0,
    transition: 'border-color 150ms ease',
    width: 24,
    '&:hover:not(:active)': {
      borderColor: theme.palette.text.secondary,
    },
    '&::after': {
      borderLeft: `2px dotted ${theme.palette.text.hint}`,
      borderRight: `2px dotted ${theme.palette.text.hint}`,
      content: "''",
      display: 'block',
      height: 10,
      left: '50%',
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: 4,
    },
  },
  draggableWrapper: {
    position: 'absolute',
  },
});

RulerResizer.propTypes = {
  classes: PropTypes.object,
  onSizeChange: PropTypes.func,
  size: PropTypes.number,
};

function RulerResizer(props) {
  const { classes, onSizeChange, size } = props;

  const handleDrag = (e, dragData) => {
    onSizeChange(Math.max(1, size + Math.round(dragData.deltaX / 64)));
  };

  return (
    <Draggable
      axis="x"
      bounds={{ left: 64 - 16 }}
      grid={[64, 0]}
      onDrag={handleDrag}
      position={{ x: size * 64 + 16, y: 0 }}
    >
      <div className={classes.draggableWrapper}>
        <div className={classes.root} />
      </div>
    </Draggable>
  );
}

export default React.memo(withTheme(withStyles(styles)(RulerResizer)));

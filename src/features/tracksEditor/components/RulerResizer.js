import withStyles from '@material-ui/styles/withStyles';
import withTheme from '@material-ui/styles/withTheme';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import Draggable from 'react-draggable';

const styles = theme => ({
  root: {
    backgroundColor: transparentize(0.5, theme.palette.text.primary),
    border: `1px solid ${theme.palette.text.primary}`,
    cursor: 'col-resize',
    height: 32,
    left: 0,
    position: 'absolute',
    top: 3,
    transition:
      'box-shadow 250ms ease, opacity 500ms ease, transform 150ms ease',
    width: 24,
    '&:hover:not(:active)': {
      backgroundColor: transparentize(0.4, theme.palette.text.primary),
    },
    '&:active': {
      backgroundColor: transparentize(0.6, theme.palette.text.primary),
    },
    '&::after': {
      borderLeft: `2px dotted ${theme.palette.text.primary}`,
      borderRight: `2px dotted ${theme.palette.text.primary}`,
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
    transition: 'transform 200ms ease',
  },
});

RulerResizer.propTypes = {
  classes: PropTypes.object,
  size: PropTypes.number,
};

function RulerResizer(props) {
  const [isDragging, setIsDragging] = React.useState(false);

  const getPosition = () => ({
    x: props.size * 64 + 16,
    y: 0,
  });

  const handleDrag = (e, dragData) => {
    props.onSizeChange(
      Math.max(1, props.size + Math.round(dragData.deltaX / 64)),
    );
  };

  return (
    <Draggable
      axis="x"
      bounds={{
        left: 64 - 16,
      }}
      grid={[64, 0]}
      onDrag={handleDrag}
      onStart={() => setIsDragging(true)}
      onStop={() => setIsDragging(false)}
      position={getPosition()}
    >
      <div className={props.classes.draggableWrapper}>
        <div
          className={props.classes.root}
          style={{
            boxShadow: isDragging && props.theme.shadows[3],
            opacity: isDragging && 0.8,
            transform: isDragging && 'translateY(-4px) scale(1.05)',
          }}
        />
      </div>
    </Draggable>
  );
}

export default React.memo(withTheme(withStyles(styles)(RulerResizer)));

import withStyles from '@material-ui/styles/withStyles';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  root: {
    alignItems: 'center',
    backgroundColor: transparentize(0.5, theme.palette.text.primary),
    border: `1px solid ${theme.palette.text.primary}`,
    cursor: 'pointer',
    display: 'flex',
    flex: '0 0 auto',
    height: 36,
    justifyContent: 'center',
    position: 'relative',
    transform: 'scale(1)',
    transition: 'transform 0.2s ease',
    width: 36,
    '&:hover:not(:active)': {
      backgroundColor: transparentize(0.6, theme.palette.text.primary),
      transform: 'scale(1.1)',
    },
    '&:active': {
      transform: 'scale(0.9)',
    },
  },
  plusHorizontal: {
    backgroundColor: theme.palette.text.primary,
    height: 1,
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 9,
  },
  plusVertical: {
    backgroundColor: theme.palette.text.primary,
    height: 9,
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1,
  },
});

function AddTrackButton(props) {
  return (
    <div
      className={props.classes.root}
      onClick={props.onClick}
      style={props.style}
    >
      <div className={props.classes.plusVertical} />
      <div className={props.classes.plusHorizontal} />
    </div>
  );
}

AddTrackButton.propTypes = {
  classes: PropTypes.object,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default React.memo(withStyles(styles)(AddTrackButton));

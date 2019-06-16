import withStyles from '@material-ui/styles/withStyles';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  root: {
    alignItems: 'center',
    backgroundColor: transparentize(0.5, theme.palette.primary.main),
    border: `1px solid ${theme.palette.primary.main}`,
    cursor: 'pointer',
    display: 'flex',
    flex: '0 0 auto',
    height: 84,
    justifyContent: 'center',
    position: 'absolute',
    width: 64,
  },
  plusHorizontal: {
    backgroundColor: theme.palette.primary.main,
    height: 1,
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 9,
  },
  plusVertical: {
    backgroundColor: theme.palette.primary.main,
    height: 9,
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1,
  },
});

class AddSequenceButton extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object,
    onClick: PropTypes.func,
    position: PropTypes.number,
  };

  render() {
    return (
      <div
        className={this.props.classes.root}
        onClick={this.handleClick}
        style={{
          left: this.props.position * 64,
        }}
      >
        <div className={this.props.classes.plusVertical} />
        <div className={this.props.classes.plusHorizontal} />
      </div>
    );
  }

  handleClick = () => {
    this.props.onClick(this.props.position);
  };
}

export default withStyles(styles)(AddSequenceButton);

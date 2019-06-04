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

class Keys extends React.PureComponent {
  static propTypes = {
    hoveredRow: PropTypes.number,
    onKeyPress: PropTypes.func,
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        {Dawww.SCALE.map(step => (
          <Key
            isHoveredRow={this.getIsHoveredRow(step)}
            key={step.y}
            onMouseDown={this.handleKeyMouseDown}
            step={step}
            style={keyStyles[step.y]}
          />
        ))}
      </div>
    );
  }

  getIsHoveredRow = step => step.y === this.props.hoveredRow;

  handleKeyMouseDown = step => {
    this.props.onKeyPress(step.y);
  };
}

export default withStyles(styles)(Keys);

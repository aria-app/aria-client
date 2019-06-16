import getOr from 'lodash/fp/getOr';
import isEqual from 'lodash/fp/isEqual';
import withStyles from '@material-ui/styles/withStyles';
import withTheme from '@material-ui/styles/withTheme';
import PropTypes from 'prop-types';
import React from 'react';
import TrackSequenceNote from './TrackSequenceNote';

const styles = theme => ({
  root: {
    display: 'flex',
    height: 84,
    padding: theme.spacing(1),
    backgroundColor: props =>
      props.isSelected
        ? theme.palette.secondary.main
        : theme.palette.primary.main,
    borderRight: `2px solid ${theme.palette.divider}`,
    boxShadow: props => props.isSelected && theme.shadows[1],
    opacity: props => props.isDragging && 0.8,
    overflow: 'hidden',
    position: 'relative',
    transform: props => props.isDragging && 'translateY(-4px) scale(1.05)',
    transition:
      'box-shadow 250ms ease, opacity 500ms ease, transform 150ms ease',
  },
});

class TrackSequence extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    isDragging: PropTypes.bool,
    isSelected: PropTypes.bool,
    onOpen: PropTypes.func,
    onSelect: PropTypes.func,
    sequence: PropTypes.object,
  };

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps, this.props);
  }

  render() {
    return (
      <div
        className={this.props.classes.root}
        style={this.getStyle()}
        onClick={this.handleClick}
        onDoubleClick={this.handleDoubleClick}
      >
        {this.props.sequence.notes.map(note => (
          <TrackSequenceNote key={note.id} note={note} />
        ))}
      </div>
    );
  }

  getStyle = () => {
    const measureCount = getOr(1, 'props.sequence.measureCount', this);

    return {
      width: measureCountToPx(measureCount),
    };
  };

  handleClick = () => {
    if (this.props.isSelected) return;

    this.props.onSelect(this.props.sequence);
  };

  handleDoubleClick = () => {
    this.props.onOpen(this.props.sequence);
  };
}

export default withTheme(withStyles(styles)(TrackSequence));

function measureCountToPx(count) {
  return count * 4 * 8 * 2;
}

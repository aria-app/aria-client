import getOr from 'lodash/fp/getOr';
import round from 'lodash/round';
import times from 'lodash/fp/times';
import PropTypes from 'prop-types';
import React from 'react';
import withStyles from '@material-ui/styles/withStyles';
import shared from '../../shared';
import RulerResizer from './RulerResizer';

const { MatrixBox } = shared.components;

const getStyles = theme => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
    flex: '0 0 auto',
    height: 35,
    marginBottom: theme.margin.m,
    position: 'relative',
  },
  measureNumber: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 10,
    position: 'absolute',
  },
});

class Ruler extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object,
    measureCount: PropTypes.number,
    measureWidth: PropTypes.number,
    onMeasureCountChange: PropTypes.func,
    onPositionSet: PropTypes.func,
  };

  render() {
    return (
      <div
        className={this.props.classes.root}
        onClick={this.handleClick}
        style={{
          width: this.getWidth(),
        }}
      >
        <MatrixBox
          fill="white"
          height={35}
          matrix={this.getMatrix()}
          width={this.getWidth()}
        />
        {times(
          i => (
            <div
              className={this.props.classes.measureNumber}
              key={i}
              style={{
                left: i * 64 + 6,
                bottom: 0,
              }}
            >
              {i + 1}
            </div>
          ),
          this.props.measureCount,
        )}
        <RulerResizer
          onSizeChange={this.props.onMeasureCountChange}
          size={this.props.measureCount}
        />
      </div>
    );
  }

  getIsLastMeasure(measureIndex) {
    return measureIndex === this.props.measureCount;
  }

  getMatrix = () =>
    times(
      row =>
        times(column => {
          if (column === 0 || column % 8 === 0) {
            if (row === 0 || row === 4) {
              return 2;
            }
            return 1;
          }
          if (row === 0) {
            return 1;
          }
          return 0;
        }, this.props.measureCount * 8 + 1),
      5,
    );

  getMeasuresStyle() {
    return {
      width: this.props.measureCount * this.props.measureWidth,
    };
  }

  getWidth = () => this.props.measureWidth * this.props.measureCount + 1;

  handleClick = e => {
    const offset = getOr(0, 'nativeEvent.offsetX', e);
    const measures = offset / this.props.measureWidth;
    const notesPerMeasure = 32;

    this.props.onPositionSet(round(measures * notesPerMeasure));
  };
}

export default withStyles(getStyles)(Ruler);

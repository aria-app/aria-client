import getOr from 'lodash/fp/getOr';
import round from 'lodash/round';
import times from 'lodash/fp/times';
import PropTypes from 'prop-types';
import React from 'react';
import shared from '../../../shared';
import './Ruler.scss';

const { MatrixBox } = shared.components;

export class Ruler extends React.PureComponent {
  static propTypes = {
    measureCount: PropTypes.number.isRequired,
    measureWidth: PropTypes.number.isRequired,
    onPositionSet: PropTypes.func.isRequired,
    isStopped: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <div
        className="ruler"
        onClick={this.handleClick}>
        <MatrixBox
          fill="white"
          matrix={this.getMatrix()}
          style={{
            height: 35,
            width: (this.props.measureWidth * this.props.measureCount) + 1,
          }}
        />
        {times(i => (
          <div
            className="ruler__measure-number"
            key={i}
            style={{
              left: (i * 64) + 6,
              bottom: 0,
            }}>
            {i + 1}
          </div>
        ), this.props.measureCount)}
      </div>
    );
  }

  getIsLastMeasure(measureIndex) {
    return measureIndex === this.props.measureCount;
  }

  getMatrix = () =>
    times(
      row => times(
        (column) => {
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
        },
        (this.props.measureCount * 8) + 1,
      ),
      5,
    );

  getMeasuresStyle() {
    return {
      width: this.props.measureCount * this.props.measureWidth,
    };
  }

  handleClick = (e) => {
    if (this.props.isStopped) return;

    const offset = getOr(0, 'nativeEvent.offsetX', e);
    const measures = offset / this.props.measureWidth;
    const notesPerMeasure = 32;

    this.props.onPositionSet(round(measures * notesPerMeasure));
  };
}

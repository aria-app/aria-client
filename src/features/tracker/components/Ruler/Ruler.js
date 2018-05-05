import Dawww from 'dawww';
import clamp from 'lodash/fp/clamp';
import times from 'lodash/fp/times';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './Ruler.scss';

const { MatrixBox } = shared.components;

export class Ruler extends React.PureComponent {
  static propTypes = {
    measureCount: PropTypes.number.isRequired,
    measureWidth: PropTypes.number.isRequired,
    onPause: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onPositionSet: PropTypes.func.isRequired,
    playbackState: PropTypes.string.isRequired,
  }

  render() {
    return h('.ruler', [
      h(MatrixBox, {
        fill: 'white',
        matrix: this.getMatrix(),
        style: {
          height: 35,
          width: (this.props.measureWidth * this.props.measureCount) + 1,
        },
      }),
      times(i =>
        h('.ruler__measure-number', {
          key: i,
          style: {
            left: (i * 64) + 6,
            bottom: 0,
          },
        }, [
          i + 1,
        ]),
      this.props.measureCount,
      ),
    ]);
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

  holdPosition = (e) => {
    e.persist();
    const startingState = this.props.playbackState;
    this.props.onPlay();
    this.props.onPositionSet((e.pageX - e.target.offsetLeft) / this.props.measureWidth);
    this.props.onPause();
    const moveHandler = (moveE) => {
      const position = moveE.pageX >= e.target.offsetLeft
        ? (moveE.pageX - e.target.offsetLeft) / this.props.measureWidth
        : 0;
      const clampedPosition = clamp(
        0,
        this.props.measureCount,
      )(position);
      this.props.onPositionSet(clampedPosition);
    };
    const upHandler = () => {
      if (startingState === Dawww.PLAYBACK_STATES.STARTED) {
        this.props.onPlay();
      }
      if (!window) return;
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', upHandler);
    };
    if (!window) return;
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', upHandler);
  }
}

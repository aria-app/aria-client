import Dawww from 'dawww';
import clamp from 'lodash/fp/clamp';
import range from 'lodash/fp/range';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import { RulerMeasure } from '../RulerMeasure/RulerMeasure';
import './Ruler.scss';

export class Ruler extends React.PureComponent {
  static propTypes = {
    bpm: PropTypes.number.isRequired,
    measureCount: PropTypes.number.isRequired,
    measureWidth: PropTypes.number.isRequired,
    onPause: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onPositionSet: PropTypes.func.isRequired,
    onSongInfoPress: PropTypes.func.isRequired,
    playbackState: PropTypes.string.isRequired,
  }

  render() {
    return h('.ruler', [
      h('.ruler__body', [
        h('.ruler__body__header', {
          onClick: this.props.onSongInfoPress,
        }, [
          h('.ruler__body__header__bpm', [
            `${this.props.bpm} bpm`,
          ]),
        ]),
        h('.ruler__body__measures', {
          style: this.getMeasuresStyle(),
          onMouseDown: this.holdPosition,
        }, [
          ...range(0, this.props.measureCount).map(measureIndex =>
            h(RulerMeasure, {
              isLastMeasure: this.getIsLastMeasure(measureIndex),
              key: measureIndex,
              measureWidth: this.props.measureWidth,
              measureIndex,
            }),
          ),
        ]),
      ]),
    ]);
  }

  getIsLastMeasure(measureIndex) {
    return measureIndex === this.props.measureCount;
  }

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

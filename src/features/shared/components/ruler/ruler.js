import clamp from 'lodash/fp/clamp';
import range from 'lodash/fp/range';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import { playbackStates } from '../../constants';
import { RulerMeasure } from '../ruler-measure/ruler-measure';
import './ruler.scss';

const measurePreviewWidth = 64;

export class Ruler extends React.PureComponent {
  static propTypes = {
    measureCount: PropTypes.number.isRequired,
    onPause: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onPositionSet: PropTypes.func.isRequired,
    playbackState: PropTypes.string.isRequired,
  }

  render() {
    return h('.ruler', [
      h('.ruler__body', [
        h('.ruler__body__header'),
        h('.ruler__body__measures', {
          style: this.getMeasuresStyle(),
          onMouseDown: this.holdPosition,
        }, [
          ...range(0, this.props.measureCount).map(measureIndex =>
            h(RulerMeasure, {
              isLastMeasure: this.getIsLastMeasure(measureIndex),
              key: measureIndex,
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
      width: this.props.measureCount * measurePreviewWidth,
    };
  }

  holdPosition = (e) => {
    e.persist();
    const startingState = this.props.playbackState;
    this.props.onPlay();
    this.props.onPositionSet((e.pageX - e.target.offsetLeft) / measurePreviewWidth);
    this.props.onPause();
    const moveHandler = (moveE) => {
      const position = moveE.pageX >= e.target.offsetLeft
        ? (moveE.pageX - e.target.offsetLeft) / measurePreviewWidth
        : 0;
      const clampedPosition = clamp(
        0,
        this.props.measureCount,
      )(position);
      this.props.onPositionSet(clampedPosition);
    };
    const upHandler = () => {
      if (startingState === playbackStates.STARTED) {
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

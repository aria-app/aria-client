import { clamp, times } from 'lodash/fp';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import transport from '../../../transport';
import './ruler.scss';

const { Icon } = shared.components;
const { hideIf } = shared.helpers;
const { STARTED } = transport.constants.playbackStates;
const notesPerMeasure = 32;
const measurePreviewWidth = notesPerMeasure * 2;

export class Ruler extends React.Component {
  static propTypes = {
    measureCount: React.PropTypes.number.isRequired,
    onPause: React.PropTypes.func.isRequired,
    onPlay: React.PropTypes.func.isRequired,
    onPositionSet: React.PropTypes.func.isRequired,
    onSongExtend: React.PropTypes.func.isRequired,
    onSongShorten: React.PropTypes.func.isRequired,
    playbackState: React.PropTypes.string.isRequired,
  }

  render() {
    return h('.ruler', [
      h('.ruler__body', [
        h('.ruler__body__header'),
        h('.ruler__body__measures', {
          style: this.getMeasuresStyle(),
          onMouseDown: this.holdPosition,
        }, [
          ...times(measureIndex => h('.ruler__body__measures__measure', {
            key: measureIndex,
            style: getMeasuresMeasureStyle(measureIndex),
          }, [
            hideIf(this.getIsLastMeasure(measureIndex))(
              h('.ruler__body__measures__measure__label', [
                measureIndex + 1,
              ]),
            ),
            hideIf(this.getIsLastMeasure(measureIndex))(
              times(eighthIndex => h('.ruler__body__measures__measure__eighth', {
                key: eighthIndex,
                style: getMeasuresMeasureEighthStyle(eighthIndex),
              }), 7),
            ),
          ]), this.props.measureCount),
        ]),
      ]),
      h('.ruler__song-length-button', [
        h('.ruler__song-length-button__side.ruler__song-length-button__side--left', {
          onClick: this.props.onSongShorten,
        }, [
          h(Icon, {
            className: 'ruler__song-length-button__side__icon ruler__song-length-button__side--left__icon',
            icon: 'chevron-left',
            size: 'small',
          }),
        ]),
        h('.ruler__song-length-button__side.ruler__song-length-button__side--right', {
          onClick: this.props.onSongExtend,
        }, [
          h(Icon, {
            className: 'ruler__song-length-button__side__icon ruler__song-length-button__side--right__icon',
            icon: 'chevron-right',
            size: 'small',
          }),
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
      if (startingState === STARTED) {
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

function getMeasuresMeasureEighthStyle(eighthIndex) {
  return {
    transform: `translateX(${(eighthIndex + 1) * (measurePreviewWidth / 8)}px)`,
  };
}

function getMeasuresMeasureStyle(measureIndex) {
  return {
    transform: `translateX(${measureIndex * measurePreviewWidth}px)`,
  };
}

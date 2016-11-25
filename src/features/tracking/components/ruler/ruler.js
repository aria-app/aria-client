import _ from 'lodash';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import transport from '../../../transport';
import './ruler.scss';

const { Icon } = shared.components;
const { STARTED } = transport.constants.playbackStates;

export class Ruler extends React.Component {
  static propTypes = {
    extendSong: React.PropTypes.func.isRequired,
    measureCount: React.PropTypes.number.isRequired,
    pause: React.PropTypes.func.isRequired,
    play: React.PropTypes.func.isRequired,
    playbackState: React.PropTypes.string.isRequired,
    setPosition: React.PropTypes.func.isRequired,
    shortenSong: React.PropTypes.func.isRequired,
  }

  render() {
    return h('.ruler', [
      h('.ruler__body', [
        h('.ruler__header'),
        h('.ruler__measures', {
          style: this.getMeasuresStyle(),
          onMouseDown: this.holdPosition,
        }, [
          ..._.times(this.props.measureCount, n => h('.ruler__measure', {
            key: n,
            style: {
              pointerEvents: 'none',
              transform: `translateX(${n * 64}px)`,
            },
          }, [
            h('.ruler__measure__label', [
              n !== this.props.measureCount ? n + 1 : '',
            ]),
            n !== this.props.measureCount ? _.times(7, m => h('.ruler__measure__eighth', {
              key: m,
              style: {
                transform: `translateX(${(m + 1) * 8}px)`,
              },
            })) : null,
          ])),
        ]),
      ]),
      h('.ruler__song-length-button', [
        h('.ruler__song-length-button__side', {
          onClick: this.props.shortenSong,
        }, [
          h(Icon, { icon: 'chevron-left', size: 'small' }),
        ]),
        h('.ruler__song-length-button__side', {
          onClick: this.props.extendSong,
        }, [
          h(Icon, { icon: 'chevron-right', size: 'small' }),
        ]),
      ]),
    ]);
  }

  getMeasuresStyle() {
    return {
      width: this.props.measureCount * 64,
    };
  }

  holdPosition = (e) => {
    e.persist();
    const startingState = this.props.playbackState;
    this.props.play();
    this.props.setPosition((e.pageX - e.target.offsetLeft) / 64);
    this.props.pause();
    const moveHandler = (moveE) => {
      const position = moveE.pageX >= e.target.offsetLeft
        ? (moveE.pageX - e.target.offsetLeft) / 64
        : 0;
      const clampedPosition = _.clamp(
        position,
        0,
        this.props.measureCount,
      );
      this.props.setPosition(clampedPosition);
    };
    const upHandler = () => {
      if (startingState === STARTED) {
        this.props.play();
      }
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', upHandler);
    };
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', upHandler);
  }
}

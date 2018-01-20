import getOr from 'lodash/fp/getOr';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import './TrackHeader.scss';

export class TrackHeader extends React.PureComponent {
  static propTypes = {
    isMuted: PropTypes.bool.isRequired,
    isSoloing: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onIsMutedToggle: PropTypes.func.isRequired,
    onIsSoloingToggle: PropTypes.func.isRequired,
    track: PropTypes.object.isRequired,
  }

  render() {
    return h('.track-header', {
      className: this.getClassName(),
      onClick: this.props.onClick,
    }, [
      h('.track-header__title', [
        this.getTitleText(),
      ]),
      h('.track-header__actions', [
        h('.track-header__actions__mute', {
          onClick: this.handleActionsMuteClick,
        }, [
          'M',
        ]),
        h('.track-header__actions__solo', {
          onClick: this.handleActionsSoloClick,
        }, [
          'S',
        ]),
      ]),
    ]);
  }

  getClassName() {
    return classnames({
      'track-header--muted': this.props.isMuted,
      'track-header--soloing': this.props.isSoloing,
    });
  }

  getTitleText = () =>
    getOr('', 'props.track.voice', this);

  handleActionsMuteClick = (e) => {
    e.stopPropagation();
    this.props.onIsMutedToggle();
  }

  handleActionsSoloClick = (e) => {
    e.stopPropagation();
    this.props.onIsSoloingToggle();
  }
}

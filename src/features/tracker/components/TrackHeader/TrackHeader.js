import getOr from 'lodash/fp/getOr';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
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
      onClick: this.props.onClick,
    }, [
      this.getTitleText(),
    ]);
  }

  getTitleText = () =>
    getOr('', 'props.track.voice', this);
}

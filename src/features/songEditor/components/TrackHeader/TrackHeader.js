import PropTypes from 'prop-types';
import React from 'react';
import { NamespacesConsumer } from 'react-i18next';
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
    return (
      <div
        className="track-header"
        onClick={this.props.onClick}>
        <NamespacesConsumer>
          {t => t(this.props.track.voice)}
        </NamespacesConsumer>
      </div>
    );
  }
}

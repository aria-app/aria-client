import getOr from 'lodash/fp/getOr';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import './track-sequence-note.scss';

export class TrackSequenceNote extends React.PureComponent {
  static propTypes = {
    note: PropTypes.object.isRequired,
  }

  render() {
    return h('.track-sequence-note', {
      style: this.getStyle(),
    });
  }

  getStyle = () => {
    const x0 = getOr(0, 'props.note.points[0].x', this);
    const x1 = getOr(0, 'props.note.points[1].x', this);
    const y0 = getOr(0, 'props.note.points[0].y', this);

    return {
      transform: `translate(${x0 * 2}px, ${y0}px)`,
      width: ((x1 - x0) + 1) * 2,
    };
  };
}

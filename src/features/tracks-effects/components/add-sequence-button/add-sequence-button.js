import compose from 'lodash/fp/compose';
import defaultTo from 'lodash/fp/defaultTo';
import getOr from 'lodash/fp/getOr';
import map from 'lodash/fp/map';
import max from 'lodash/fp/max';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './add-sequence-button.scss';

const { Icon } = shared.components;

export class AddSequenceButton extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    track: PropTypes.object.isRequired,
  }

  render() {
    return h('.add-sequence-button', {
      onClick: this.props.onClick,
      style: this.getStyle(),
    }, [
      h(Icon, {
        className: 'add-sequence-button__icon',
        icon: 'plus',
        size: 'large',
      }),
    ]);
  }

  getStyle() {
    const getPosition = compose(
      defaultTo(0),
      max,
      map(s => s.position + s.measureCount),
      getOr([], 'props.track.sequences'),
    );

    return {
      transform: `translateX(${getPosition(this) * 64}px)`,
    };
  }
}

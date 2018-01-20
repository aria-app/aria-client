import compose from 'lodash/fp/compose';
import defaultTo from 'lodash/fp/defaultTo';
import getOr from 'lodash/fp/getOr';
import map from 'lodash/fp/map';
import max from 'lodash/fp/max';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './AddSequenceButton.scss';

const { Icon } = shared.components;

export class AddSequenceButton extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    track: PropTypes.object.isRequired,
  }

  render() {
    return h('.add-sequence-button', {
      onClick: this.handleClick,
      style: this.getStyle(),
    }, [
      h(Icon, {
        className: 'add-sequence-button__icon',
        icon: 'plus',
        size: 'large',
      }),
    ]);
  }

  getAddPosition = () => compose(
    defaultTo(0),
    max,
    map(s => s.position + s.measureCount),
    getOr([], 'props.track.sequences'),
  )(this);

  getStyle() {
    return {
      transform: `translateX(${this.getAddPosition() * 64}px)`,
    };
  }

  handleClick = () => {
    this.props.onClick(this.getAddPosition());
  };
}

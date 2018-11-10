import React from 'react';
import shared from '../../../shared';
import './AddSequenceButton.scss';

const { Icon } = shared.components;

export const AddSequenceButton = props => (
  <div
    className="add-sequence-button"
    {...props}>
    <Icon
      className="add-sequencer-button__icon"
      icon="plus"
    />
  </div>
);

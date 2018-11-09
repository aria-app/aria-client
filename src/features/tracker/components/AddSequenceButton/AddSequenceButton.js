import h from 'react-hyperscript';
import shared from '../../../shared';
import './AddSequenceButton.scss';

const { Icon } = shared.components;

export const AddSequenceButton = props =>
  h('.add-sequence-button', props, [
    h(Icon, {
      className: 'add-sequence-button__icon',
      icon: 'plus',
    }),
  ]);

import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, pure, setPropTypes } from 'recompose';
import {
  ZenNotesContainer,
} from '../../containers/zen-notes-container/zen-notes-container';
import {
  ZenPositionMarkerContainer,
} from '../../containers/zen-position-marker-container/zen-position-marker-container';
import { ZenSlotsContainer } from '../../containers/zen-slots-container/zen-slots-container';
import './zen-grid.scss';

const component = ({
  onSlotPress,
}) => h('.zen-grid', [
  h('.zen-grid__wrapper', [
    h(ZenSlotsContainer, { onSlotPress }),
    h(ZenNotesContainer),
    h(ZenPositionMarkerContainer),
  ]),
]);

export const ZenGrid = compose([
  setPropTypes({
    onSlotPress: PropTypes.func,
  }),
  pure,
])(component);

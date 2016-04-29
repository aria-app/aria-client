import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, pure, setPropTypes } from 'recompose';
import { Notes } from '../notes/notes';
import { PositionMarker } from '../position-marker/position-marker';
import { Slots } from '../slots/slots';
import './grid.scss';

const component = ({
  onSlotPress,
}) => h('.grid', [
  h('.grid__wrapper', [
    h(Slots, { onSlotPress }),
    h(Notes),
    h(PositionMarker),
  ]),
]);

export const Grid = compose([
  setPropTypes({
    onSlotPress: PropTypes.func,
  }),
  pure,
])(component);

import h from 'react-hyperscript';
import { Notes } from '../notes/notes';
import { PositionMarker } from '../position-marker/position-marker';
import { Slots } from '../slots/slots';
import './grid.scss';

const component = () => h('.grid', [
  h('.grid__wrapper', [
    h(Slots),
    h(Notes),
    h(PositionMarker),
  ]),
]);

export const Grid = component;

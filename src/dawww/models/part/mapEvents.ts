import times from 'lodash/fp/times';

import { Part } from '../../types';

type MapEvents = (
  iteratee: (event: any, index: number) => any,
  part: Part,
) => void;

export const mapEvents: MapEvents = (iteratee, part) => {
  const length = part.length || 0;
  const mappedEvents: any = [];

  times((index) => {
    const event = part.at(index);

    mappedEvents[index] = iteratee(event, index);
  }, length);

  times((index) => {
    const event = mappedEvents?.[index];
    part.at(index, event);
  }, length);
};

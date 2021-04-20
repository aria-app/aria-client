import getOr from 'lodash/fp/getOr';
import invokeArgs from 'lodash/fp/invokeArgs';
import times from 'lodash/fp/times';

type MapEvents = (
  iteratee: (event: any, index: number) => any,
  part: any,
) => void;

export const mapEvents: MapEvents = (iteratee, part) => {
  const length = getOr(0, 'length', part);
  const mappedEvents: any = [];

  times((index) => {
    const event = invokeArgs('at', [index], part);
    mappedEvents[index] = iteratee(event, index);
  }, length);

  times((index) => {
    const event = getOr({}, index, mappedEvents);
    invokeArgs('at', [index, event], part);
  }, length);
};

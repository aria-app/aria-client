import test from 'ava';
import sinon from 'sinon';
import { setTransportPartEvents } from '../setTransportPartEvents';
import * as actions from '../../../actions';

test('should invoke models.part.mapEvents with function that returns { fn: function that invokes dispatch with actions.positionSet(payload) when focusedSequenceId is not defined, payload: index }, and getState().transportPart', t => {
  const dispatch = sinon.spy();
  const mapEvents = sinon.spy();
  setTransportPartEvents(
    () => ({
      transportPart: { id: 'a' },
    }),
    {},
    {
      models: {
        part: {
          mapEvents,
        },
      },
      dispatch,
    },
  );
  t.deepEqual(mapEvents.lastCall.args[1], { id: 'a' });
  const event = mapEvents.lastCall.args[0](null, 0);
  t.is(event.payload, 0);
  event.fn('a');
  t.deepEqual(dispatch.lastCall.args, [actions.positionSet('a')]);
});

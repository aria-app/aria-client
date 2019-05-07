import test from 'ava';
import sinon from 'sinon';
import * as actions from '../../../actions';
import { acceptSequenceDeletion } from '../acceptSequenceDeletion';

test('should invoke dispatch with actions.sequenceDeletionAccepted(sequence)', t => {
  const expected = [actions.sequenceDeletionAccepted({ id: 'a' })];
  const dispatch = sinon.spy();
  acceptSequenceDeletion(
    () => ({}),
    {
      payload: {
        sequence: { id: 'a' },
      },
    },
    {
      dispatch,
    },
  );
  const result = dispatch.lastCall.args;
  t.deepEqual(result, expected);
});

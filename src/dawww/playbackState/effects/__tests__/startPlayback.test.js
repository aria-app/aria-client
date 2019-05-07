import test from 'ava';
import sinon from 'sinon';
import * as actions from '../../../actions';
import * as constants from '../../../constants';
import { startPlayback } from '../startPlayback';

test('should invoke toneAdapter.start, dispatch with actions.playbackStateSet(constants.PLAYBACK_STATES.STARTED)', t => {
  const dispatch = sinon.spy();
  const start = sinon.spy();
  startPlayback(
    () => ({}),
    {},
    {
      toneAdapter: {
        start,
      },
      dispatch,
    },
  );
  t.deepEqual(dispatch.lastCall.args, [
    actions.playbackStateSet(constants.PLAYBACK_STATES.STARTED),
  ]);
  t.deepEqual(start.calledOnce, true);
});

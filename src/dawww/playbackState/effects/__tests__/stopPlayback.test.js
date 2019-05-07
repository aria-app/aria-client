import test from 'ava';
import sinon from 'sinon';
import * as actions from '../../../actions';
import * as constants from '../../../constants';
import { stopPlayback } from '../stopPlayback';

test('should invoke toneAdapter.stop, dispatch with actions.playbackStateSet(constants.PLAYBACK_STATES.STARTED), dispatch with actions.positionSetRequested(0)', t => {
  const dispatch = sinon.spy();
  const stop = sinon.spy();

  stopPlayback(
    () => ({}),
    {},
    {
      toneAdapter: {
        stop,
      },
      dispatch,
    },
  );
  t.deepEqual(dispatch.getCall(0).args, [
    actions.playbackStateSet(constants.PLAYBACK_STATES.STOPPED),
  ]);
  t.deepEqual(dispatch.getCall(1).args, [actions.positionSetRequested(0)]);
  t.deepEqual(stop.calledOnce, true);
});

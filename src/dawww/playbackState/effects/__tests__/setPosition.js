import test from 'ava';
import sinon from 'sinon';
import * as actions from '../../../actions';
import { setPosition } from '../setPosition';

test('should invoke toneAdapter.setTransportPosition with loopStartPoint + position - 1 as time, dispatch with actions.playbackStateSet(constants.PLAYBACK_STATES.STARTED)', t => {
  const dispatch = sinon.spy();
  const setTransportPosition = sinon.spy();
  setPosition(
    () => ({
      loopStartPoint: 1,
    }),
    {
      payload: {
        position: 1,
      },
    },
    {
      helpers: {
        sizeToTime: x => `${x}!`,
      },
      toneAdapter: {
        setTransportPosition,
      },
      selectors: {
        getLoopStartPoint: state => state.loopStartPoint,
      },
      dispatch,
    },
  );
  t.deepEqual(dispatch.lastCall.args, [actions.positionSet(1)]);
  t.deepEqual(setTransportPosition.lastCall.args, ['32!']);
});

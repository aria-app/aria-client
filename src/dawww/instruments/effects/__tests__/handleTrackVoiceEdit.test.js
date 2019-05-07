import test from 'ava';
import sinon from 'sinon';
import { handleTrackVoiceEdit } from '../handleTrackVoiceEdit';

test('should invoke models.instrument.setVoice with instrument, action.payload.value', t => {
  const expected = [{ id: 'a' }, 'guitar'];
  const setVoice = sinon.spy();
  handleTrackVoiceEdit(
    () => ({
      instruments: {
        a: { id: 'a' },
      },
    }),
    {
      payload: {
        id: 'a',
        value: 'guitar',
      },
    },
    {
      models: {
        instrument: {
          setVoice,
        },
      },
    },
  );
  const result = setVoice.lastCall.args;
  t.deepEqual(result, expected);
});

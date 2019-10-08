import test from 'ava';
import sinon from 'sinon';
import { handleNotePlay } from '../handleNotePlay';

test('should invoke models.instrument.playNote with instrument, name, length, time', t => {
  const expected = [{ id: 'a' }, 'C3', 2, '(0 * 32n)'];
  const playNote = sinon.spy();
  handleNotePlay(
    () => ({
      instruments: {
        a: { id: 'a' },
      },
    }),
    {
      payload: {
        length: 2,
        time: '(0 * 32n)',
        pitch: 'C',
        trackId: 'a',
      },
    },
    {
      helpers: {
        getPitchName: x => `${x}3`,
      },
      models: {
        instrument: {
          playNote,
        },
      },
    },
  );
  const result = playNote.lastCall.args;
  t.deepEqual(result, expected);
});

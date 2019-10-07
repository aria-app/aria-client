import test from 'ava';
import sinon from 'sinon';
import { handlePartStepTriggered } from '../handlePartStepTriggered';

test('should invoke models.instrument.playNote once for each noteId with instrument, name, length, time', t => {
  const playNote = sinon.spy();
  handlePartStepTriggered(
    () => ({
      instruments: {
        a: { id: 'a' },
      },
      song: {
        notes: {
          a: {
            length: 2,
            points: [{ y: 'C' }],
          },
          b: {
            length: 3,
            points: [{ y: 'D' }],
          },
        },
      },
    }),
    {
      payload: {
        length: 2,
        time: '(0 * 32n)',
        noteIds: ['a', 'b'],
        trackId: 'a',
      },
    },
    {
      helpers: {
        getNoteLength: x => x.length,
        getPitchName: x => `${x}3`,
      },
      models: {
        instrument: {
          playNote,
        },
      },
    },
  );
  t.deepEqual(playNote.getCall(0).args, [{ id: 'a' }, 'C3', 2, '(0 * 32n)']);
  t.deepEqual(playNote.getCall(1).args, [{ id: 'a' }, 'D3', 3, '(0 * 32n)']);
});

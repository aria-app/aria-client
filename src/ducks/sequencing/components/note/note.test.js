import h from 'react-hyperscript';
import { mount, shallow } from 'enzyme';
import song from '../../../song';
import { Note } from './note';

describe('Note Component', () => {
  it('should be defined', () => {
    const note = shallow(h(Note, { note: {} }));
    expect(note).not.toBe(undefined);
  });

  it('should have correct connector transforms, given straight note', () => {
    const note = mount(h(Note, {
      note: song.helpers.createNote({
        sequenceId: 'my-sequence',
        points: [
          { x: 0, y: 35 },
          { x: 1, y: 35 },
        ],
      }),
    }));
    const { transform } = note.find('.note__point-connector')
      .prop('style');
    const expected = 'rotate(0deg) scaleX(40)';
    expect(transform).toEqual(expected);
  });

  it('should have correct connector transforms, given bent note', () => {
    const note = mount(h(Note, {
      note: song.helpers.createNote({
        sequenceId: 'my-sequence',
        points: [
          { x: 0, y: 35 },
          { x: 1, y: 37 },
        ],
      }),
    }));
    const connector = note.find('.note__point-connector');
    const { transform } = connector.prop('style');

    const expected = 'rotate(63.43494882292201deg) scaleX(89.44271909999159)';
    expect(transform).toEqual(expected);
  });
});

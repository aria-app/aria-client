import h from 'react-hyperscript';
import { mount } from 'enzyme';
import song from 'ducks/song';
import { Note } from './note';

describe('Note Component', () => {
  it('should be defined', () => {
    const note = mount(h(Note, {
      isSelected: false,
      note: {
        points: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
        ],
      },
    }));
    expect(note).toBeDefined();
  });

  it('should have correct transform', () => {
    const note = mount(h(Note, {
      isSelected: false,
      note: song.helpers.createNote({
        sequenceId: 'my-sequence',
        points: [
          { x: 2, y: 2 },
          { x: 4, y: 2 },
        ],
      }),
    }));
    const { transform } = note.find('.note').prop('style');
    const expected = 'translate(80px, 80px)';
    expect(transform).toEqual(expected);
  });

  describe('connector', () => {
    it('should have correct transform, given straight note', () => {
      const note = mount(h(Note, {
        isSelected: false,
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

    it('should have correct transform, given bent note', () => {
      const note = mount(h(Note, {
        isSelected: false,
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

  describe('final point', () => {
    it('should have display none if length is 0', () => {
      expect(false).toEqual(true);
    });

    it('should have display flex if length is not 0', () => {
      expect(false).toEqual(true);
    });

    it('should have correct transform', () => {
      expect(false).toEqual(true);
    });
  });
});

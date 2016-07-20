import h from 'react-hyperscript';
import { mount } from 'enzyme';
import { Track } from './track';

describe('Track Component', () => {
  it('should be defined', () => {
    const component = mount(h(Track, {
      addSequence: () => {},
      deselectSequence: () => {},
      isMuted: false,
      isSoloing: false,
      onSequenceContextMenu: () => {},
      openSequence: () => {},
      onTrackSelect: () => {},
      selectedSequenceId: '',
      selectSequence: () => {},
      songMeasureCount: 0,
      toggleTrackIsMuted: () => {},
      toggleTrackIsSoloing: () => {},
      track: {
        sequences: [],
      },
    }));
    expect(component).toBeDefined();
  });

  describe('header title', () => {
    it('should contain synth type', () => {
      const component = mount(h(Track, {
        addSequence: () => {},
        deselectSequence: () => {},
        isMuted: false,
        isSoloing: false,
        onSequenceContextMenu: () => {},
        openSequence: () => {},
        onTrackSelect: () => {},
        selectedSequenceId: '',
        selectSequence: () => {},
        songMeasureCount: 0,
        toggleTrackIsMuted: () => {},
        toggleTrackIsSoloing: () => {},
        track: {
          sequences: [],
          synthType: 'SQUARE',
        },
      }));
      const expected = 'SQUARE';
      const text = component.find('.track__header__title').text().trim();
      expect(text).toEqual(expected);
    });
  });

  describe('mute action', () => {
    it('should have active class when muted', () => {
      const component = mount(h(Track, {
        addSequence: () => {},
        deselectSequence: () => {},
        isMuted: true,
        isSoloing: false,
        onSequenceContextMenu: () => {},
        openSequence: () => {},
        onTrackSelect: () => {},
        selectedSequenceId: '',
        selectSequence: () => {},
        songMeasureCount: 0,
        toggleTrackIsMuted: () => {},
        toggleTrackIsSoloing: () => {},
        track: {
          sequences: [],
          synthType: 'SQUARE',
        },
      }));
      const trackEl = component.find('.track__header__action--mute');
      expect(trackEl.hasClass('track__header__action--active')).toEqual(true);
    });

    it('should not have active class when not muted', () => {
      const component = mount(h(Track, {
        addSequence: () => {},
        deselectSequence: () => {},
        isMuted: false,
        isSoloing: false,
        onSequenceContextMenu: () => {},
        openSequence: () => {},
        onTrackSelect: () => {},
        selectedSequenceId: '',
        selectSequence: () => {},
        songMeasureCount: 0,
        toggleTrackIsMuted: () => {},
        toggleTrackIsSoloing: () => {},
        track: {
          sequences: [],
          synthType: 'SQUARE',
        },
      }));
      const trackEl = component.find('.track__header__action--mute');
      expect(trackEl.hasClass('track__header__action--active')).toEqual(false);
    });
  });

  describe('solo action', () => {
    it('should have active class when soloing', () => {
      const component = mount(h(Track, {
        addSequence: () => {},
        deselectSequence: () => {},
        isMuted: false,
        isSoloing: true,
        onSequenceContextMenu: () => {},
        openSequence: () => {},
        onTrackSelect: () => {},
        selectedSequenceId: '',
        selectSequence: () => {},
        songMeasureCount: 0,
        toggleTrackIsMuted: () => {},
        toggleTrackIsSoloing: () => {},
        track: {
          sequences: [],
          synthType: 'SQUARE',
        },
      }));
      const trackEl = component.find('.track__header__action--solo');
      expect(trackEl.hasClass('track__header__action--active')).toEqual(true);
    });

    it('should not have active class when not soloing', () => {
      const component = mount(h(Track, {
        addSequence: () => {},
        deselectSequence: () => {},
        isMuted: false,
        isSoloing: false,
        onSequenceContextMenu: () => {},
        openSequence: () => {},
        onTrackSelect: () => {},
        selectedSequenceId: '',
        selectSequence: () => {},
        songMeasureCount: 0,
        toggleTrackIsMuted: () => {},
        toggleTrackIsSoloing: () => {},
        track: {
          sequences: [],
          synthType: 'SQUARE',
        },
      }));
      const trackEl = component.find('.track__header__action--solo');
      expect(trackEl.hasClass('track__header__action--active')).toEqual(false);
    });
  });

  describe('sequences', () => {
    it('should have width of song measure count * 64', () => {
      const component = mount(h(Track, {
        addSequence: () => {},
        deselectSequence: () => {},
        isMuted: false,
        isSoloing: false,
        onSequenceContextMenu: () => {},
        openSequence: () => {},
        onTrackSelect: () => {},
        selectedSequenceId: '',
        selectSequence: () => {},
        songMeasureCount: 3,
        toggleTrackIsMuted: () => {},
        toggleTrackIsSoloing: () => {},
        track: {
          sequences: [],
          synthType: 'SQUARE',
        },
      }));
      const expected = 192;
      const { width } = component.find('.track__sequences').prop('style');
      expect(width).toEqual(expected);
    });
  });

  describe('add button', () => {
    it('should be translated to end of sequences', () => {
      const component = mount(h(Track, {
        addSequence: () => {},
        deselectSequence: () => {},
        isMuted: false,
        isSoloing: false,
        onSequenceContextMenu: () => {},
        openSequence: () => {},
        onTrackSelect: () => {},
        selectedSequenceId: '',
        selectSequence: () => {},
        songMeasureCount: 4,
        toggleTrackIsMuted: () => {},
        toggleTrackIsSoloing: () => {},
        track: {
          sequences: [{
            position: 2,
            measureCount: 1,
            notes: [],
          }],
          synthType: 'SQUARE',
        },
      }));
      const expected = 'translateX(192px)';
      const { transform } = component.find('.track__add-button').prop('style');
      expect(transform).toEqual(expected);
    });
  });
});
